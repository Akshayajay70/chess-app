import express from 'express';
import { config } from './config/index';
import { connectDB } from './infrastructure/database/connection';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling';

const { port: PORT } = config;

const app = express();

app.use(express.json())
app.use(express.urlencoded())

app.use(errorHandlingMiddleware);

async function startDB() {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`)
    });
}

startDB();