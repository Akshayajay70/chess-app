import { config } from "../../../config/index.ts";
import mongoose from "mongoose";

const { MONGO_URL: URL } = config;

export async function connectDB() {
    try {
        await mongoose.connect(URL);
        console.log(`Database connected successfully`);
    } catch (error) {
        console.error(
            `Error connecting DB`,
            error instanceof Error
                ? error.message
                : 'DB connection failed'
        );
        process.exit(1)
    }
}