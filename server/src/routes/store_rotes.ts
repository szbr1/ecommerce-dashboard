
import { createStore, deleteStore, totalStores, updateStore } from '@/controllers/store-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createStore);
route.post('/update', updateStore);
route.delete('/delete', deleteStore);
route.get('/totalStores', totalStores);

export default route;
