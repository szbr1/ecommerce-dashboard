import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '@/lib/cloudinary';

interface CloudinaryParams {
  folder: string;
  allowed_formats: string[];
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as CloudinaryParams,
});

export const upload = multer({ storage });
