import {
  createProduct,
  deleteProduct,
  getAllreviews,
  getProducts,
  totalProducts,
  updateProduct,
} from '@/controllers/product-controllers';
import { upload } from '@/middleware/upload';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', upload.array('imagesUrl', 5), createProduct);
route.patch('/update', updateProduct);
route.delete('/delete', deleteProduct);
route.get('/totalProducts', totalProducts);
route.get('/getProducts', getProducts);
route.get('/getAllReviews', getAllreviews);

export default route;
