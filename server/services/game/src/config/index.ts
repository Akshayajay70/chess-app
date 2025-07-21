import dotenv from "dotenv";

dotenv.config();

type AppConfig = {
    port: number,
    nodeEnv: string,
    frontendUrl: string;
    kafkaUrl: string;
    mongoUrl: string;
}

export const config: AppConfig = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV as string,
    frontendUrl: process.env.FRONTEND_URL as string,
    kafkaUrl: process.env.KAFKA_URL as string,
    mongoUrl: process.env.MONGO_URL as string,
}