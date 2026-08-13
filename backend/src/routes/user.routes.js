import express from 'express';
import cors from 'cors';
import {registerUser, loginUser, updateUser} from '../controllers/auth.controller.js';
import {searchUser} from '../controllers/user.controller.js';
import  {authMiddleware}  from '../middlewares/middleware.js'
import { getBalance, transferAmount } from '../controllers/transection.controller.js';

const corsOption = {
    origin: "http://localhost:3001/",
    optionsSuccessStatus: 200
}

const router = express.Router();
router.use(cors(corsOption));
router.post('/user/signup', registerUser);
router.post('/user/signin', loginUser);
router.put('/user/update', authMiddleware, updateUser);
router.get('/user/bulk', authMiddleware, searchUser);
router.get('/account', authMiddleware, getBalance);
router.post('/account/transfer', authMiddleware, transferAmount);

export default router;