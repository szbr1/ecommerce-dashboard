import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '@/controllers/product-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createProduct);
route.post('/update', updateProduct);
route.delete('/delete', deleteProduct);

export default route;
