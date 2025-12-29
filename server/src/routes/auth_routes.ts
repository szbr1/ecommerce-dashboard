import { signIn, singUp } from '@/controllers/auth-controllers';
import express from 'express';
import type { Router } from 'express';

const route: Router = express.Router();

route.post('/signUp', singUp);
route.post('/signIn', signIn);

export default route;
