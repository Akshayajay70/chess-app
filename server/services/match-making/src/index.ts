import express from 'express';
import { config } from './config/index';

const app = express();
const { port: PORT } = config;

app.get('/' , (req, res) => res.send('Hii from server'))

app.listen(PORT, () => console.log(`🚀 Match-making service running at http://localhost:${PORT}`)) 