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
          text: `You are an intelligent photo evaluator designed to select the best photo from a set of images that contain animals. 

Analyze all images based on the following criteria and assign a score out of 100 to each image. Select the one with the highest overall quality. If no image meets the criteria, explain why.

1. **Animal Detection**: Confirm that there is at least one animal clearly visible in the photo. If a human is also present, check whether the animal and human are interacting in a warm, emotionally engaging way (e.g., both looking at the camera, mutual gaze, or physical closeness).

2. **Technical Quality**:
   - *Sharpness*: Prefer images that are in focus and not blurry.
   - *Exposure*: The image should not be underexposed or overexposed.
   - *Noise*: Lower visual noise is better, especially in darker areas.
   - *Color Balance*: Colors should look natural and realistic.

3. **Aesthetics and Composition**:
   - Is the animal properly framed (not cut off)?
   - Is the background clean and non-distracting?
   - Are composition rules like the rule of thirds or golden ratio applied?

4. **Animal Pose and Expression**:
   - Are the animal's eyes open and clearly visible?
   - Is the animal facing the camera or positioned naturally?
   - Is the pose cute, engaging, or expressive?
   - If in motion, is the movement captured sharply (no motion blur)?
   - Bonus points for specific indicators of emotion:
     - Cats: upright ears, relaxed posture.
     - Dogs: wagging tail, open mouth (happy expression).
     - Horses: clear full-body stance, upright neck.

5. **Similarity Check**:
   - If there are multiple similar photos, prefer the one that is clearest and most expressive.
   - Penalize near-duplicates with lower technical or emotional quality.

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
      console.log("Executing initial Animal AI analysis (step 1)...");
      const firstTurnContents = [{
        role: "user",
        parts: [
          { text: `Please analyze these animal photos based on the system instructions and select the single best one. Return only the sequence number of the best photo.` },
          ...inlineDataImages
        ],
      }];

      const result1 = await ai.models.generateContent({ model, config, contents: firstTurnContents });

      finalOutputText = result1.text;
      rawApiResponse = result1;
      console.log("Gemini Animal first output:", finalOutputText);

      if (!finalOutputText) {
        return NextResponse.json(
          { error: "Empty response from Gemini AI on first turn (Animal)" },
          { status: 500 }
        );
      }

      const outputInt = parseInt(finalOutputText.trim(), 10);
      if (!isNaN(outputInt) && outputInt > 0 && outputInt <= files.length) {
        bestPhotoIndex = outputInt - 1;
        bestPhoto = files[bestPhotoIndex]?.name;
      }
      reasonText = "AI selected the best animal photo.";

    } else {
      console.log("Executing Animal feedback processing (step 2)...");
      const secondTurnContents = [
        { role: "user", parts: [
           { text: `Please analyze these animal photos based on the system instructions and select the single best one. Return only the sequence number of the best photo.` },
           ...inlineDataImages
         ]},
         { role: "model", parts: [{ text: firstAiOutputText || "No specific first output." }] },
         { role: "user", parts: [{ text: `Based on my previous feedback: ${feedback}. Can you re-evaluate the animal photos? Focus on the best options according to my comments and the original instructions. Return only the sequence number of the photo you now consider best.` }] }
       ];

      const result2 = await ai.models.generateContent({ model, config, contents: secondTurnContents });

      finalOutputText = result2.text;
      rawApiResponse = result2;
      console.log("Gemini Animal second output:", finalOutputText);

      if (!finalOutputText) {
        return NextResponse.json(
          { error: "Empty response from Gemini AI on second turn (Animal)" },
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
    console.error("Gemini Animals API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
