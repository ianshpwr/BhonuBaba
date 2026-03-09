import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db';

dotenv.config();

// Connect to database
connectDB();

const app: Express = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(morgan('dev'));
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import { notFound, errorHandler } from './middlewares/errorMiddleware';

app.use(express.json());

import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Production safety - Global error handling to prevent silent crash loops
process.on('unhandledRejection', (err: any) => {
    console.error(`[Process] Unhandled Rejection Error: ${err?.message || err}`);
});

process.on('uncaughtException', (err: any) => {
    console.error(`[Process] Uncaught Exception Error: ${err?.message || err}`);
    process.exit(1);
});
