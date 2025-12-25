
import { createOrder, deleteOrder,  getOrder,  totalOrders, update,  } from "../controllers/order-controllers"
import type { Router } from "express";
import express from "express";


const route: Router = express.Router();

route.post('/create', createOrder);
route.delete('/delete', deleteOrder);
route.get('/totalOrders', totalOrders);
route.patch('/updateOrder', update)
route.get('/getOrder', getOrder)

export default route
