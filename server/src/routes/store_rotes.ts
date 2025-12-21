
import { createStore, deleteStore, storeOrders, allCustomers, totalSales, totalStores, updateStore, lastweekSales, lastyearSales } from '@/controllers/store-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createStore);
route.post('/update', updateStore);
route.delete('/delete', deleteStore);
route.get('/totalStores', totalStores);
route.get('/storeOrdes', storeOrders)
route.patch('/totalSales', totalSales);
route.patch("/totalClients", allCustomers)
route.patch('/lastweekSales', lastweekSales)
route.patch('/lastyearSales', lastyearSales)
export default route;
