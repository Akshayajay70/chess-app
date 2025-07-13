import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT;
const URL = process.env.FRONTEND_URL;

app.use(cors({
    credentials: true,
    origin: URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(morgan('combined'));

app.use('/user', createProxyMiddleware({
    target: 'http://localhost:8001',
    changeOrigin: true
}))

app.listen(PORT, () => console.log(`Gateway is running on Port: ${PORT}`));