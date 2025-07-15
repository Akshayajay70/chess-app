import express from 'express';
import { config } from './config/index';
import { connectDB } from './infrastructure/database/connection';

const app = express();
const { port: PORT } = config;


async function startDB() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`)
    });
}

startDB();