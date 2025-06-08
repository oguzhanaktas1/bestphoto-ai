import { IncomingForm } from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing form data:', err);
        return res.status(500).json({ error: 'Error uploading file' });
      }

      const photoFile = files.photo && files.photo.length > 0 ? files.photo[0] : null;

      if (!photoFile || !photoFile.originalFilename) {
        console.error('Error: No photo file provided or filename missing.');
        return res.status(400).json({ error: 'No photo file provided or filename missing' });
      }

      const uploadsDir = path.join(process.cwd(), 'public', 'my-photos');
      if (!fs.existsSync(uploadsDir)) {
        console.log(`Creating upload directory: ${uploadsDir}`);
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const originalFilename = photoFile.originalFilename;
      const fileExtension = path.extname(originalFilename);
      const baseFilename = path.basename(originalFilename, fileExtension);
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const newFilename = `${baseFilename}-${uniqueSuffix}${fileExtension}`;

      const newPath = path.join(uploadsDir, newFilename);
      console.log(`Attempting to save photo to: ${newPath}`);

      try {
        await fs.promises.rename(photoFile.filepath, newPath);
        const publicPath = `/my-photos/${newFilename}`;
        console.log(`Photo saved successfully. Public path: ${publicPath}`);
        res.status(200).json({ message: 'Photo saved successfully', filePath: publicPath });
      } catch (error) {
        console.error('Error saving photo:', error);
        res.status(500).json({ error: 'Error saving photo' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 