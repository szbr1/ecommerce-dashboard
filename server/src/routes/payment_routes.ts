import { getTotalSalesCount } from '@/controllers/payment-controllers';
import type { Router } from 'express';
import express from 'express';

const route: Router = express.Router();

route.get('/getTotalSalesCount', getTotalSalesCount);

export default route;
