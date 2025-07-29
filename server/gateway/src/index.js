import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import { verifyToken } from './verifyToken.js';

config();

const app = express();
const PORT = Number(process.env.PORT);
const URL = process.env.FRONTEND_URL;

app.use(cors({
    credentials: true,
    origin: URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('combined'));

app.use('/user', verifyToken('user'), createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/user`,
    changeOrigin: true
}));

app.use('/auth', createProxyMiddleware({
    target: `${process.env.USER_SERVICE_URL}/auth`,
    changeOrigin: true,
    pathRewrite: { '^/auth': '/auth' },
}));

app.use('/admin/login', createProxyMiddleware({
    target: `${process.env.ADMIN_SERVICE_URL}/admin/login`,
    changeOrigin: true
}));

app.use('/admin', verifyToken('admin'), createProxyMiddleware({
    target: `${process.env.ADMIN_SERVICE_URL}/admin`,
    changeOrigin: true
}));

app.use('/rating', verifyToken('user'), createProxyMiddleware({
    target: `${process.env.RATING_SERVICE_URL}/rating`,
    changeOrigin: true
}));

app.use('/friends', verifyToken('user'), createProxyMiddleware({
    target: `${process.env.FRIENDS_SERVICE_URL}/friends`,
    changeOrigin: true
}));

app.listen(PORT, () => console.log(`Gateway is running on Port: ${PORT}`));