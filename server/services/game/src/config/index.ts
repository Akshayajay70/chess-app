import dotenv from "dotenv";

dotenv.config();

type AppConfig = {
    PORT: number,
    nodeEnv: string,
    frontendUrl: string;
    kafkaUrl: string;
    MONGO_URL: string;
    REDIS_URL: string;
}

export const config: AppConfig = {
    PORT: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV as string,
    frontendUrl: process.env.FRONTEND_URL as string,
    kafkaUrl: process.env.KAFKA_URL as string,
    MONGO_URL: process.env.MONGO_URL as string,
    REDIS_URL: process.env.REDIS_URL as string,
}