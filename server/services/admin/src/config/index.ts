import dotenv from "dotenv";

dotenv.config();

type AppConfig = {
    port: number,
    nodeEnv: string,
    mongoUrl: string,
    jwtSecretAccess: string;
    jwtAccessExp: number;
    frontendUrl: string;
    kafkaUrl: string;
    adminUsername: string;
    adminPassword: string;
}

export const config: AppConfig = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV as string,
    mongoUrl: process.env.MONGO_URL as string,
    jwtSecretAccess: process.env.JWT_ACCESS_SECRET as string,
    jwtAccessExp: Number(process.env.JWT_ACCESS_EXP),
    frontendUrl: process.env.FRONTEND_URL as string,
    kafkaUrl: process.env.KAFKA_URL as string,
    adminUsername: process.env.ADMIN_USERNAME as string,
    adminPassword: process.env.ADMIN_PASSWORD as string,
}