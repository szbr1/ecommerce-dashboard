import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

// TO GET ENV VAR
dotenv.config();

cloudinary.config({
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  cloud_name: process.env.CLOUD_NAME,
});

export default cloudinary;
