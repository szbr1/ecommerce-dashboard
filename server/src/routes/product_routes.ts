import {
  createProduct,
  deleteProduct,
  totalProducts,
  updateProduct,
} from '@/controllers/product-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createProduct);
route.post('/update', updateProduct);
route.delete('/delete', deleteProduct);
route.get('/totalProducts', totalProducts);

export default route;
