import express from 'express';
import cors from 'cors';
import {registerUser, loginUser, updateUser} from '../controllers/auth.controller.js';
import  {authMiddleware}  from '../middlewares/middleware.js'

const corsOption = {
    origin: "http://localhost:3001/",
    optionsSuccessStatus: 200
}

const router = express.Router();

router.get('/login', async (req, res) => {
    res.status(200).json({message: "welcome to login"});
})
router.get('/user' , async (req, res) => {
    res.status(200).json({message: "Welcome user"});
})
router.post('/user/signup', registerUser);
router.post('/user/signin', loginUser);
router.put('/user/update', authMiddleware, updateUser);

export default router;