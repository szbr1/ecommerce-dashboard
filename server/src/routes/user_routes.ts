import {
  createProfile,
  totalUsers,
  updateProfile,
} from '@/controllers/user-controller';
import { upload } from '@/middleware/upload';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.get('/totalUsers', totalUsers);
route.post('/create', createProfile);
route.patch('/update', upload.single('avatar'), updateProfile);

export default route;
