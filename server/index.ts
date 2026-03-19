import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';

dotenv.config();

// Connect to database only if not in test env
if (process.env.NODE_ENV !== 'test') {
    connectDB();
}

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "https://bhonu-baba.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// Debug logging middleware for incoming requests
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

app.use(morgan('dev'));
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';

app.use(express.json());

import authRoutes from './routes/authRoutes';
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
    app.listen(port, "0.0.0.0", () => {
        console.log(`Server is running on port ${port}`);
    });
}

export default app;

// Production safety - Global error handling to prevent silent crash loops
process.on('unhandledRejection', (err: any) => {
    console.error(`[Process] Unhandled Rejection Error: ${err?.message || err}`);
});

process.on('uncaughtException', (err: any) => {
    console.error(`[Process] Uncaught Exception Error: ${err?.message || err}`);
    process.exit(1);
});
