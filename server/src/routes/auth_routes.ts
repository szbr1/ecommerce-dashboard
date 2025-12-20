import { signIn, singUp, totalUsers } from "@/controllers/auth-controllers";
import express from "express";
import type { Router } from "express";


const route: Router = express.Router()

route.post("/signUp", singUp)
route.post("/signIn", signIn)
route.get("/totalUsers", totalUsers)

export default route;