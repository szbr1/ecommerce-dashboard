
import { createOrder, deleteOrder, getOrders,  getOrder, update, getOrdersPageCounts,  } from "../controllers/order-controllers"
import type { Router } from "express";
import express from "express";


const route: Router = express.Router();

route.post('/create', createOrder);
route.delete('/delete', deleteOrder);
route.patch('/updateOrder', update)
route.get('/getOrder', getOrder)
route.get('/getOrders', getOrders)
route.get('/getOrdersPageCounts', getOrdersPageCounts)
export default route
