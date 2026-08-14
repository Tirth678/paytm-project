import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './src/db/db.js';
import rootRouter from './src/routes/user.routes.js'
import config from './src/config/config.js'

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/v1', rootRouter);

app.get('/', async (req, res) => {
    res.status(200).json({message: "server is active and healthy"});
});

// For local development
if (process.env.NODE_ENV !== 'production') {
    const PORT = config.PORT || 3001;
    app.listen(PORT, () => {
        console.log(`Server active on ${PORT}`);
    });
}

// Export for Vercel serverless
export default app;