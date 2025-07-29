import mongoose from "mongoose";
import { config } from "../config/index.ts";


export async function connectToDatabase() {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw new Error("Database connection failed");
    }
}
