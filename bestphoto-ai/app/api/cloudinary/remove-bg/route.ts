import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function POST(req: Request) {
  console.log("[/api/cloudinary/remove-bg] API route hit.");
  try {
    const { public_id } = await req.json();
    console.log("[/api/cloudinary/remove-bg] Received public_id:", public_id);

    if (!public_id) {
      console.error("[/api/cloudinary/remove-bg] Missing public_id.");
      return NextResponse.json({ error: 'public_id is required' }, { status: 400 });
    }

    console.log("[/api/cloudinary/remove-bg] Generating background-removed URL with Cloudinary...");
    const bgRemovedUrl = cloudinary.url(public_id, {
      effect: 'background_removal',
      format: 'png',
      quality: 'auto',
    });

    console.log("[/api/cloudinary/remove-bg] Background-removed URL generated:", bgRemovedUrl);
    return NextResponse.json({ bgRemovedUrl });
  } catch (error: any) {
    console.error("[/api/cloudinary/remove-bg] Error in API route:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
