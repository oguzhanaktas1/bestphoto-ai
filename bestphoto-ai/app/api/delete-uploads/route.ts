import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
  const { filenames } = await req.json();

  if (!Array.isArray(filenames) || filenames.length === 0) {
    return NextResponse.json({ message: 'No filenames provided.' }, { status: 400 });
  }

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const results: { filename: string; success: boolean; error?: string }[] = [];

  for (const filename of filenames) {
    const filePath = path.join(uploadDir, filename);

    // Basic security check: Ensure the file is within the uploads directory
    if (!filePath.startsWith(uploadDir)) {
        results.push({ filename, success: false, error: 'Invalid file path.' });
        continue;
    }

    try {
      await fs.unlink(filePath);
      results.push({ filename, success: true });
    } catch (error: any) {
      console.error(`Failed to delete ${filename}:`, error);
      results.push({ filename, success: false, error: error.message });
    }
  }

  const allSuccessful = results.every(r => r.success);
  const status = allSuccessful ? 200 : 500;

  return NextResponse.json({ results }, { status });
} 