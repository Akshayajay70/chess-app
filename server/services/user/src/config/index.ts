import dotenv from "dotenv";

dotenv.config();

type AppConfig = {
    port: number,
    nodeEnv: string,
    mongoUrl: string
}

export const config: AppConfig = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV as string,
    mongoUrl: process.env.MONGO_URL as string
}