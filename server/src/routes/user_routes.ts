
import { createProfile, totalUsers, updateProfile } from '@/controllers/user-controller';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.get("/totalUsers", totalUsers)
route.post("/create", createProfile)
route.patch("/update", updateProfile)

export default route;
