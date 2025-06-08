import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

// Maksimum dosya boyutu: 10MB
const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ message: 'Dosya bulunamadı.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ message: 'Geçersiz dosya türü. Sadece JPEG, PNG, WEBP kabul edilir.' }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ message: 'Dosya 10MB’den büyük olamaz.' }, { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = path.join(process.cwd(), 'public/uploads');
  const ext = path.extname(file.name) || '.jpg';
  const uniqueName = `${Date.now()}-${uuidv4()}${ext}`;
  const filePath = path.join(uploadDir, uniqueName);

  try {
    await mkdir(uploadDir, { recursive: true });
    await writeFile(filePath, buffer);

    return NextResponse.json({
      message: 'Yükleme başarılı',
      filename: uniqueName,
      url: `/uploads/${uniqueName}`,
    });
  } catch (error) {
    console.error('Yükleme hatası:', error);
    return NextResponse.json({ message: 'Dosya yüklenemedi.' }, { status: 500 });
  }
}
