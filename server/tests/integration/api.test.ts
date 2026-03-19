import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../index';
import User from '../../models/User';
import Product from '../../models/Product';
import dotenv from 'dotenv';
dotenv.config();

const TEST_DB = process.env.TEST_MONGO_URI || 'mongodb://127.0.0.1:27017/bhonubaba-test';

describe('API Integration Tests', () => {
    beforeAll(async () => {
        await mongoose.connect(TEST_DB);
        await User.deleteMany({});
        await Product.deleteMany({});
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    describe('Auth API [/auth]', () => {
        it('should register a new user successfully', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    name: 'Integration User',
                    email: 'integration@test.com',
                    password: 'password123'
                });

            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty('_id');
            expect(res.body).toHaveProperty('token');
            expect(res.body.email).toBe('integration@test.com');
        });

        it('should not allow duplicate registration', async () => {
            const res = await request(app)
                .post('/auth/register')
                .send({
                    name: 'Integration User 2',
                    email: 'integration@test.com',
                    password: 'password123'
                });

            expect(res.status).toBe(400);
            expect(res.body.message).toBe('User already exists');
        });

        it('should authenticate user successfully', async () => {
            const res = await request(app)
                .post('/auth/login')
                .send({
                    email: 'integration@test.com',
                    password: 'password123'
                });

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('token');
            expect(res.body.email).toBe('integration@test.com');
        });
    });

    describe('Products API [/products]', () => {
        let productId: string;

        beforeAll(async () => {
            const doc: any = await Product.create({
                name: 'Test Product',
                image: '/images/sample.jpg',
                description: 'test description',
                brand: 'TestBrand',
                category: 'TestCat',
                price: 100,
                countInStock: 5,
                rating: 0,
                numReviews: 0,
            } as any);
            productId = doc!._id.toString();
        });

        it('should fetch all products', async () => {
            const res = await request(app).get('/products');
            expect(res.status).toBe(200);
            expect(res.body.length).toBeGreaterThan(0);
            expect(res.body[0].name).toBe('Test Product');
        });

        it('should fetch a single product by ID', async () => {
            const res = await request(app).get(`/products/${productId}`);
            expect(res.status).toBe(200);
            expect(res.body.name).toBe('Test Product');
        });

        it('should return 404 for invalid product ID', async () => {
            // Valid MongoDB ObjectId but not in DB
            const invalidId = new mongoose.Types.ObjectId().toString();
            const res = await request(app).get(`/products/${invalidId}`);
            expect(res.status).toBe(404);
            expect(res.body.message).toBe('Product not found');
        });
    });
});
