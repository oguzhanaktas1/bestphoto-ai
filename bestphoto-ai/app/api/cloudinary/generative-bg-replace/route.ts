import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function POST(req: Request) {
  try {
    const { public_id, prompt } = await req.json();

    if (!public_id || !prompt) {
      return NextResponse.json(
        { error: "public_id and prompt are required" },
        { status: 400 }
      );
    }

    const result = await cloudinary.uploader.explicit(public_id, {
      type: "upload",
      eager: [
        {
          effect: "sepia",
          format: "png",
        },
      ],
      eager_async: false,
    });

    const generatedUrl = result.eager?.[0]?.secure_url;

    if (!generatedUrl) {
      return NextResponse.json({ error: "No generated image" }, { status: 500 });
    }

    return NextResponse.json({ generatedUrl, originalUrl: result.secure_url });
  } catch (error) {
    console.error("Generative BG Replace hatası:", error);
    return NextResponse.json(
      { error: "Failed to replace background" },
      { status: 500 }
    );
  }
}


