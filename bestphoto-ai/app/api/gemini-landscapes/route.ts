import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI, HarmBlockThreshold, HarmCategory } from "@google/genai";

interface IncomingFile {
  name: string;
  data: string;
  type: string;
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY environment variable is not set." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const files = body.files as IncomingFile[];
    const feedback = body.feedback as string | undefined;
    const firstAiOutputText = body.firstOutput as string | undefined;

    if (!files || !Array.isArray(files) || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    // Gemini API için fotoğrafları inlineData formatına dönüştür
    const inlineDataImages = files.map((file) => ({
      inlineData: {
        data: file.data,
        mimeType: file.type,
      },
    }));

    const model = "gemini-2.5-flash-preview-04-17";

    // Prompt ve güvenlik ayarları
    const config = {
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
        },
      ],
      responseMimeType: "text/plain",
      systemInstruction: [
        {
          text: `You are an AI photo evaluator. Analyze a set of landscape photos and select the single best one based on the following criteria:

1. **Technical Quality:**
   - Sharpness: Prefer photos that are in focus and not blurry. Penalize motion blur or out-of-focus images.
   - Exposure: Avoid overexposed or underexposed images. Prefer well-balanced lighting with a good dynamic range.
   - Contrast: Ensure clear tonal separation; avoid flat or dull images.
   - Color Saturation: Colors should be vivid and natural, not overly enhanced or washed out.
   - Noise: Penalize high noise, especially in skies and flat areas.

2. **Aesthetics & Composition:**
   - Rule of Thirds / Golden Ratio: Check if horizon lines and key subjects follow composition rules.
   - Depth: Prefer photos with clear foreground, midground, and background for a sense of depth.
   - Leading Lines: Prefer compositions that use natural lines (roads, rivers, fences) to guide the viewer's eye.
   - Symmetry / Asymmetry: Look for intentional and balanced framing.
   - Natural Framing: Use of trees, arches, or other natural objects to frame the main scene is preferred.

3. **Lighting & Timing:**
   - Golden Hour: Prefer photos taken during sunrise or sunset with warm, soft lighting.
   - Blue Hour: Cool, balanced tones with a dramatic atmosphere are desirable.
   - Weather Conditions: Clouds, fog, or rain that add mood or drama are positive features. Avoid empty, dull skies.

4. **Content & Subject:**
   - Strong Focal Point: There should be a clear subject like a mountain, lake, or tree that anchors the composition.
   - Emotional Impact: Favor photos that evoke feelings such as peace, awe, or wonder.
   - Interesting Elements: Look for reflections, rainbows, mist, or celestial elements (stars, moon) that enhance uniqueness.

5. **Similarity Analysis (if applicable):**
   - If multiple photos depict the same scene, prefer the one with better light, sharpness, composition, and overall visual impact.

Return only the selected photo's sequence number`,
        },
      ],
    };

    let finalOutputText;
    let bestPhoto = null;
    let bestPhotoIndex = null;
    let reasonText = "";
    let rawApiResponse;

    if (!feedback) {
      console.log("Executing initial Landscape AI analysis (step 1)...");
      const firstTurnContents = [{
        role: "user",
        parts: [
          { text: `Please analyze these landscape photos based on the system instructions and select the single best one. Return only the sequence number of the best photo.` },
          ...inlineDataImages
        ],
      }];

      const result1 = await ai.models.generateContent({ model, config, contents: firstTurnContents });

      finalOutputText = result1.text;
      rawApiResponse = result1;
      console.log("Gemini Landscape first output:", finalOutputText);

      if (!finalOutputText) {
        return NextResponse.json(
          { error: "Empty response from Gemini AI on first turn (Landscape)" },
          { status: 500 }
        );
      }

      const outputInt = parseInt(finalOutputText.trim(), 10);
      if (!isNaN(outputInt) && outputInt > 0 && outputInt <= files.length) {
        bestPhotoIndex = outputInt - 1;
        bestPhoto = files[bestPhotoIndex]?.name;
      }
      reasonText = "AI selected the best landscape photo.";

    } else {
      console.log("Executing Landscape feedback processing (step 2)...");
      const secondTurnContents = [
        { role: "user", parts: [
           { text: `Please analyze these landscape photos based on the system instructions and select the single best one. Return only the sequence number of the best photo.` },
           ...inlineDataImages
         ]},
         { role: "model", parts: [{ text: firstAiOutputText || "No specific first output." }] },
         { role: "user", parts: [{ text: `Based on my previous feedback: ${feedback}. Can you re-evaluate the landscape photos? Focus on the best options according to my comments and the original instructions. Return only the sequence number of the photo you now consider best.` }] }
       ];

      const result2 = await ai.models.generateContent({ model, config, contents: secondTurnContents });

      finalOutputText = result2.text;
      rawApiResponse = result2;
      console.log("Gemini Landscape second output:", finalOutputText);

      if (!finalOutputText) {
        return NextResponse.json(
          { error: "Empty response from Gemini AI on second turn (Landscape)" },
          { status: 500 }
        );
      }

      const outputInt = parseInt(finalOutputText.trim(), 10);
      if (!isNaN(outputInt) && outputInt > 0 && outputInt <= files.length) {
        bestPhotoIndex = outputInt - 1;
        bestPhoto = files[bestPhotoIndex]?.name;
      }
      reasonText = finalOutputText;
    }

    return NextResponse.json({
      bestPhotoId: bestPhoto,
      bestPhotoIndex,
      reason: reasonText,
      rawResponse: rawApiResponse,
    });
  } catch (error: any) {
    console.error("Gemini Landscapes API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
