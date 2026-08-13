import config from "../config/config.js";
import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({message: "No token provided"});
    }

    const token = authHeader.split(' ')[1]; // for seleting 1st index element with Bearer token

    try {
        const decoded = jwt.verify(token, config.JWT_SECRET);

        req.userId = decoded.userId;

        next();
    } catch (err) {
        return res.status(403).json({message: "Invalid token"});
    }
};

export  { authMiddleware };