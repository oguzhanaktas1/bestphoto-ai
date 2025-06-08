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
    const originalImages = body.originalImages as any[] | undefined;

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
          text: `You are an advanced AI photo evaluator tasked with selecting the single best photo from a set of user-provided images. Evaluate each photo using the following criteria:

Technical Quality:
Sharpness: The image must be clear and well-focused, especially on the human subject’s face.

Exposure: Ensure the lighting is balanced — avoid underexposed or overexposed photos.

Noise Level: Prefer photos with minimal visual noise and maximum clarity.

Aesthetic Quality:
Assess the overall visual appeal of each image, considering:

Composition

Color balance

Background suitability

Subject prominence

Use your understanding of aesthetic principles to determine which image looks the most professional and visually pleasing.

Human Face and Pose Analysis:
Detect human faces in each image. Only evaluate images that contain at least one visible human face.

Disqualify any photo where:

No human face is detected

Eyes are closed

The face is blurred or distorted due to motion

Prefer images where the person is:

Smiling or showing a natural, friendly expression

Facing the camera or captured in a well-composed angle

Similarity Check:
Ensure all photos are visually related — same person, similar background, and consistent context.

Discard any image that appears unrelated or out of context.

Selection Criteria:
After analyzing all valid and visually related photos, select the single best photo based on a combined score of:

Technical quality

Aesthetic appeal

Human facial clarity and expression

Return only the selected photo's sequence number`,
        },
      ],
    };

    let finalResult;
    let finalOutputText;
    let bestPhoto = null;
    let bestPhotoIndex = null;
    let reasonText = "";
    let rawApiResponse;

    if (!feedback) {
      console.log("Executing initial AI analysis (step 1)...");
      // Gemini AI ilk çağrısı için prompt ve görseller
      const firstTurnContents = [{
        role: "user",
        parts: [
          { text: `Please analyze these photos based on the system instructions and select the single best one. Return only the sequence number of the best photo.` },
          ...inlineDataImages
        ],
      }];

      // İlk Gemini AI çağrısı
      const result1 = await ai.models.generateContent({ model, config, contents: firstTurnContents });

      finalOutputText = result1.text;
      rawApiResponse = result1;
      console.log("Gemini first output:", finalOutputText);

      if (!finalOutputText) {
        return NextResponse.json(
          { error: "Empty response from Gemini AI on first turn" },
          { status: 500 }
        );
      }

      // İlk çıktıdan en iyi fotoğraf indexini parse et (sayı bekleniyor)
      const outputInt = parseInt(finalOutputText.trim(), 10);
      if (!isNaN(outputInt) && outputInt > 0 && outputInt <= files.length) {
        bestPhotoIndex = outputInt - 1;
        // API'ye gönderilen dosya listesindeki ada göre bul
        bestPhoto = files[bestPhotoIndex]?.name;
      }
      reasonText = "AI selected the best photo.";

    } else {
      console.log("Executing feedback processing (step 2)...");
      // İkinci AI çağrısı için konuşma geçmişi ve yeni input (frontend'den gelen feedback)
      const secondTurnContents = [
        { role: "user", parts: [
          { text: `Please analyze these photos based on the system instructions and select the single best one. Return only the sequence number of the best photo.` },
          ...inlineDataImages
        ]},
        { role: "model", parts: [{ text: firstAiOutputText || "No specific first output." }] },
        { role: "user", parts: [{ text: `Based on my previous feedback: ${feedback}. Can you re-evaluate the photos? Focus on the best options according to my comments and the original instructions. Return only the sequence number of the photo you now consider best.` }] }
      ];

      // İkinci Gemini AI çağrısı
      const result2 = await ai.models.generateContent({ model, config, contents: secondTurnContents });

      finalOutputText = result2.text;
      rawApiResponse = result2;
      console.log("Gemini second output:", finalOutputText);

      if (!finalOutputText) {
        return NextResponse.json(
          { error: "Empty response from Gemini AI on second turn" },
          { status: 500 }
        );
      }

      // İkinci çıktıdan en iyi fotoğraf indexini parse et (hala sayı bekleniyorsa)
      const outputInt = parseInt(finalOutputText.trim(), 10);
      if (!isNaN(outputInt) && outputInt > 0 && outputInt <= files.length) {
        bestPhotoIndex = outputInt - 1;
        // API'ye gönderilen dosya listesindeki ada göre bul
        bestPhoto = files[bestPhotoIndex]?.name;
      }
      reasonText = finalOutputText;
    }

    // Nihai yanıtı döndür
    return NextResponse.json({
      bestPhotoId: bestPhoto,
      bestPhotoIndex,
      reason: reasonText,
      rawResponse: rawApiResponse,
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
