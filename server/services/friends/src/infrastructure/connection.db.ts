import mongoose from "mongoose";
import { config } from "dotenv";

config();

export async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
}
