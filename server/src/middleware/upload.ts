import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '@/lib/cloudinary';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'products',                   
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as any,
});

export const upload = multer({ storage });