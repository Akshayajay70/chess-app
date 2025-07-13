import { connect } from "mongoose";
import { config } from "../../config";

export async function connectDB() {
    try {
        await connect(config.mongoUrl);
        console.log("✅ DB connected successfully");
    } catch (error) {
        console.error("❌ DB connection error:", error instanceof Error ? error.message : error);
        process.exit(1);
    }
}
