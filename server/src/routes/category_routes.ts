import {
  createCategory,
  deleteCategory,
  totalCategories,
} from '@/controllers/category-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createCategory);
route.delete('/delete', deleteCategory);
route.get('/totalCategories', totalCategories);

export default route;
