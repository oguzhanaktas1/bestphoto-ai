import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

export async function GET() {
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  try {
    // Read all items in the directory
    const items = await fs.readdir(uploadDir);

    // Filter out directories, keeping only files
    const files = [];
    for (const item of items) {
      const itemPath = path.join(uploadDir, item);
      const stats = await fs.stat(itemPath);
      if (stats.isFile()) {
        files.push(item);
      }
    }

    return NextResponse.json({ files });
  } catch (error: any) {
    // If the directory doesn't exist yet, return an empty array
    if (error.code === 'ENOENT') {
      return NextResponse.json({ files: [] });
    }
    console.error('Error listing uploads:', error);
    return NextResponse.json(
      { message: 'Failed to list uploads.', error: error.message },
      { status: 500 }
    );
  }
} 