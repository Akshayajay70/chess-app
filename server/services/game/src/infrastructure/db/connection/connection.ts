import { config } from "../../../config/index.ts";
import mongoose from "mongoose";

export async function connectDB() {
    try {
        await mongoose.connect(config.mongoUrl as string);
        console.log(`Database connected successfully`);
    } catch (error) {
        console.log(error);
        throw new Error(error instanceof Error ? error.message : 'Failed to connect with db');
    }
}