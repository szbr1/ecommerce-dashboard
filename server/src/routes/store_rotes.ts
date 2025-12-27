
import { createStore, deleteStore, getProfle, getStore,  getTotalFollowersCount,  updateProfile,  updateStore, } from '@/controllers/store-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/create', createStore);
route.post('/update', updateStore);
route.delete('/delete', deleteStore);
route.get('/getStore', getStore)
route.get('/getProfile', getProfle)
route.patch('/updateProfile', updateProfile)
route.get('/getFollowers', getTotalFollowersCount )

export default route