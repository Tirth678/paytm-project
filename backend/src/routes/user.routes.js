import express from 'express';
import cors from 'cors';
import {registerUser, loginUser} from '../controllers/auth.controller.js';

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
router.post('/user/signup', cors(corsOption), registerUser);
router.post('/user/signin', cors(corsOption), loginUser)

export default router;