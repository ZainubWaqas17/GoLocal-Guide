import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config(); // ✅ Load .env file before using process.env

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI; // ✅ Use correct env variable
        if (!MONGO_URI) {
            throw new Error("MONGO_URI is undefined. Check your .env file.");
        }
        //Connects to MongoDB using the provided connection string.
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
