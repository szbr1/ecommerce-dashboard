import {
  createProduct,
  deleteProduct,
  getProducts,
  totalProducts,
  updateProduct,
} from '@/controllers/product-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createProduct);
route.patch('/update', updateProduct);
route.delete('/delete', deleteProduct);
route.get('/totalProducts', totalProducts);
route.get('/getProducts', getProducts)

export default route;
