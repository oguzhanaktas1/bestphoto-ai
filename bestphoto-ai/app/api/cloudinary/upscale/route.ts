import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
  secure: true,
});

export async function POST(request: Request) {
  console.log("[/api/cloudinary/upscale] API route hit.");
  try {
    const { public_id, factor } = await request.json();
    console.log("[/api/cloudinary/upscale] Received public_id:", public_id, "and factor:", factor);

    if (!public_id || !factor) {
      console.error("[/api/cloudinary/upscale] Missing public_id or factor.");
      return NextResponse.json({ error: 'Missing public_id or factor' }, { status: 400 });
    }

    // Validate factor (e.g., 2, 4)
    if (![2, 4].includes(factor)) {
      console.error("[/api/cloudinary/upscale] Invalid upscale factor:", factor);
      return NextResponse.json({ error: 'Invalid upscale factor. Must be 2 or 4.' }, { status: 400 });
    }

    // Get original image dimensions from Cloudinary
    console.log("[/api/cloudinary/upscale] Fetching original image dimensions from Cloudinary for public_id:", public_id);
    const assetInfo = await cloudinary.api.resource(public_id);
    const originalWidth = assetInfo.width;
    const originalHeight = assetInfo.height;

    if (!originalWidth || !originalHeight) {
        console.error("[/api/cloudinary/upscale] Could not retrieve original image dimensions.");
        return NextResponse.json({ error: 'Could not retrieve original image dimensions for upscaling.' }, { status: 500 });
    }

    const targetWidth = originalWidth * factor;
    const targetHeight = originalHeight * factor;

    console.log("[/api/cloudinary/upscale] Generating upscaled URL with Cloudinary...");
    const upscaledUrl = cloudinary.url(public_id, {
      quality: "auto",
      effect: "upscale", // AI-powered upscale
      width: targetWidth,
      height: targetHeight,
      crop: "scale" // Use scale crop for explicit scaling
    });

    console.log("[/api/cloudinary/upscale] Upscaled URL generated:", upscaledUrl);
    return NextResponse.json({ upscaledUrl });
  } catch (error: any) {
    console.error("[/api/cloudinary/upscale] Error in API route:", error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
