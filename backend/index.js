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
app.use('/api/v1', rootRouter);
connectDB();

const PORT = config.PORT;

app.get('/', async (req, res) => {
    res.status(200).json({message: "server is active and healthy"});
});



app.listen(PORT, () => {
    console.log(`Server active on ${PORT}`);
});

export default app;