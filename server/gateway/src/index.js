import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { verifyToken } from './verifyToken.js';

config();

const app = express();
const PORT = process.env.PORT;
const URL = process.env.FRONTEND_URL;

app.use(cors({
    credentials: true,
    origin: URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('combined'));

app.use('/auth', createProxyMiddleware({
    target: 'http://localhost:8001',
    changeOrigin: true
}));

app.use('/user', verifyToken('user'), createProxyMiddleware({
    target: 'http://localhost:8001',
    changeOrigin: true
}));

app.use('/admin/login', createProxyMiddleware({
    target: 'http://localhost:8002',
    changeOrigin: true
}));

app.use('/admin', verifyToken('admin'), createProxyMiddleware({
    target: 'http://localhost:8002',
    changeOrigin: true
}));


app.listen(PORT, () => console.log(`Gateway is running on Port: ${PORT}`));