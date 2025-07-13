import express, { type Request, type Response, type NextFunction } from 'express';
import { config } from './config';
import { errorHandlingMiddleware } from './presentation/middlewares/error-handling';
import { connectDB } from './infrastructure/database/connection';

const app = express();
const { port: PORT } = config;

// --- Error Handling Middleware ---
app.use(errorHandlingMiddleware)

async function start() {
    await connectDB()
    app.listen(PORT, () => console.log(`Server running at PORT: ${PORT}`))
}
start()