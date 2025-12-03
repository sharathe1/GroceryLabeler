import fs from 'fs';
import path from 'path';
import { Request } from 'express';
import multer from 'multer';

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), 'uploads');

// Ensure upload directory exists
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, UPLOAD_DIR);
  },
  filename: (_req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `${timestamp}-${file.originalname}`);
  }
});

export const uploadMiddleware = multer({ storage });

export const getPublicImageUrl = (req: Request, storedFilePath: string) => {
  // In production you'd serve from S3/CloudFront/etc. For now we return a basic absolute URL.
  const relativePath = path.relative(process.cwd(), storedFilePath);
  return `${req.protocol}://${req.get('host')}/${relativePath.replace(/\\/g, '/')}`;
};

export const getUploadDir = () => UPLOAD_DIR;
