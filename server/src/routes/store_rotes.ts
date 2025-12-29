import {
  createStore,
  deleteStore,
  getFollowersByYear,
  getProfle,
  getStore,
  updateProfile,
  updateStore,
} from '@/controllers/store-controllers';
import { upload } from '@/middleware/upload';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createStore);
route.patch(
  '/update',
  upload.fields([
    { name: 'brandshoot', maxCount: 1 },
    { name: 'brandshootProduct1', maxCount: 1 },
    { name: 'brandshootProduct2', maxCount: 1 },
    { name: 'avatarUrl', maxCount: 1 },
    { name: 'poster', maxCount: 1 },
  ]),
  updateStore
);
route.delete('/delete', deleteStore);
route.get('/getStore', getStore);
route.get('/getProfile', getProfle);
route.patch('/updateProfile', updateProfile);
route.get('/getFollowersByYear', getFollowersByYear);
export default route;
