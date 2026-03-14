import { Request, Response } from 'express';
import { registerUser, authUser } from '../../controllers/authController';
import User from '../../models/User';

jest.mock('../../models/User');
process.env.JWT_SECRET = 'test_secret_key';

describe('Auth Controller Unit Tests', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockReq = { body: {} };
        mockRes = {
            json: mockJson,
            status: mockStatus,
        };
        jest.clearAllMocks();
    });

    describe('registerUser', () => {
        it('should return 400 if user already exists', async () => {
            mockReq.body = { name: 'Test', email: 'test@test.com', password: 'password' };
            (User.findOne as jest.Mock).mockResolvedValue({ _id: '123', email: 'test@test.com' });

            await registerUser(mockReq as Request, mockRes as Response);

            expect(mockStatus).toHaveBeenCalledWith(400);
            expect(mockJson).toHaveBeenCalledWith({ message: 'User already exists' });
        });

        it('should return 201 and token on successful registration', async () => {
            mockReq.body = { name: 'Test', email: 'new@test.com', password: 'password' };
            (User.findOne as jest.Mock).mockResolvedValue(null);
            
            const newUser = {
                _id: '12345',
                name: 'Test',
                email: 'new@test.com',
                isAdmin: false,
                toString: () => '12345'
            };

            (User.create as jest.Mock).mockResolvedValue(newUser);

            await registerUser(mockReq as Request, mockRes as Response);

            expect(mockStatus).toHaveBeenCalledWith(201);
            expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
                _id: '12345',
                name: 'Test',
                email: 'new@test.com',
                token: expect.any(String)
            }));
        });
    });

    describe('authUser', () => {
        it('should return 401 on invalid credentials', async () => {
            mockReq.body = { email: 'bad@test.com', password: 'wrong' };
            (User.findOne as jest.Mock).mockResolvedValue(null);

            await authUser(mockReq as Request, mockRes as Response);

            expect(mockStatus).toHaveBeenCalledWith(401);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Invalid email or password' });
        });

        it('should return user info and token on valid login', async () => {
            mockReq.body = { email: 'good@test.com', password: 'correct' };
            
            const validUser = {
                _id: '12345',
                name: 'Test',
                email: 'good@test.com',
                isAdmin: false,
                matchPassword: jest.fn().mockResolvedValue(true),
                toString: () => '12345'
            };

            (User.findOne as jest.Mock).mockResolvedValue(validUser);

            await authUser(mockReq as Request, mockRes as Response);

            expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
                _id: '12345',
                email: 'good@test.com',
                token: expect.any(String)
            }));
            expect(mockStatus).not.toHaveBeenCalled();
        });
    });
});
