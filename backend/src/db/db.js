import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../config/config.js'
dotenv.config()
async function connectDB(){
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log(`Connected to DB`);
    } catch (error) {
        console.log(`Error in connecting to DB ${error}`);
    }
}
export default connectDB;