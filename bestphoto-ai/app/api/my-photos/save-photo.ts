import { IncomingForm, Fields, Files } from 'formidable';
import { promises as fs } from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export const config = {
  api: {
    bodyParser: false, // formidable ile body'yi kendimiz işleyeceğiz
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const form = new IncomingForm();

  form.parse(req, async (err, fields: Fields, files: Files) => {
    if (err) {
      console.error('Error parsing form data:', err);
      return res.status(500).json({ error: 'Error processing file upload.' });
    }

    // formidable files objesinden yüklenen dosyayı al
    // 'photo' key'i, frontend'de FormData.append('photo', ...) olarak gönderdiğimiz key ile eşleşmeli
    const photoFile = files.photo?.[0];

    if (!photoFile) {
      return res.status(400).json({ error: 'No file uploaded or file key is incorrect.' });
    }

    const uploadDir = path.join(process.cwd(), 'public', 'my-photos');

    try {
      // Yükleme dizinini oluştur (eğer yoksa)
      await fs.mkdir(uploadDir, { recursive: true });

      // Dosya adını güvenli hale getir ve benzersiz yap
      const originalFilename = photoFile.originalFilename || 'uploaded_photo';
      const fileExtension = path.extname(originalFilename);
      const baseFilename = path.basename(originalFilename, fileExtension);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const newFilename = `${baseFilename}-${uniqueSuffix}${fileExtension}`;
      const filePath = path.join(uploadDir, newFilename);

      // Geçici dosyayı kalıcı konuma taşı (formidable geçici bir dosya oluşturur)
      await fs.rename(photoFile.filepath, filePath);

      // Public URL'i oluştur
      const publicUrl = `/my-photos/${newFilename}`;

      res.status(200).json({ message: 'File uploaded successfully', url: publicUrl });
    } catch (writeError) {
      console.error('Error saving file:', writeError);
      res.status(500).json({ error: 'Failed to save file.' });
    }
  });
} 