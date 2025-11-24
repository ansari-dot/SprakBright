import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async() => {
    try {
        const uri = process.env.MONGO_URI;

        if (!uri) {
            throw new Error("❌ MONGO_URI not found in environment variables");
        }

        const options = {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 3000,
            socketTimeoutMS: 45000,
            family: 4,
        };

        const conn = await mongoose.connect(uri, options);

        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(` MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;