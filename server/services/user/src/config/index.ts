import dotenv from "dotenv";

dotenv.config();

type AppConfig = {
    port: number,
    nodeEnv: string,
    mongoUrl: string,
    googleClientId: string;
    googleClientSecret: string;
    jwtSecretAccess: string;
    jwtSecretRefresh: string;
    jwtAccessExp: number;
    jwtRefreshExp: number;
    frontendUrl: string;
    kafkaUrl: string;
}

export const config: AppConfig = {
    port: Number(process.env.PORT),
    nodeEnv: process.env.NODE_ENV as string,
    mongoUrl: process.env.MONGO_URL as string,
    googleClientId: process.env.GOOGLE_CLIENT_ID as string,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    jwtSecretAccess: process.env.JWT_ACCESS_SECRET as string,
    jwtSecretRefresh: process.env.JWT_REFRESH_SECRET as string,
    jwtAccessExp: Number(process.env.JWT_ACCESS_EXP),
    jwtRefreshExp: Number(process.env.JWT_REFRESH_EXP),
    frontendUrl: process.env.FRONTEND_URL as string,
    kafkaUrl: process.env.KAFKA_URL as string
}