import { getPaymentPageCounts } from "@/controllers/counts-controllers";
import { getOrdersPageCounts } from "@/controllers/order-controllers";
import type { Router } from "express";
import express from "express"


const route: Router = express.Router();

route.get("/getPaymentCounts", getPaymentPageCounts);
route.get("/getOrderCounts", getOrdersPageCounts);

export default route;