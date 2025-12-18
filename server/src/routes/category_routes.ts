
import { createCategory, deleteCategory } from '@/controllers/category-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createCategory);
route.delete('/delete', deleteCategory);

export default route;
