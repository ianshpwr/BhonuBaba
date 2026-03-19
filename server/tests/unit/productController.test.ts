import { Request, Response } from 'express';
import { getProducts, getProductById } from '../../controllers/productController';
import Product from '../../models/Product';

jest.mock('../../models/Product');

describe('Product Controller Unit Tests', () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockJson: jest.Mock;
    let mockStatus: jest.Mock;

    beforeEach(() => {
        mockJson = jest.fn();
        mockStatus = jest.fn().mockReturnValue({ json: mockJson });
        mockReq = { params: {} };
        mockRes = {
            json: mockJson,
            status: mockStatus,
        };
        jest.clearAllMocks();
    });

    describe('getProducts', () => {
        it('should return a list of products', async () => {
            const mockProducts = [{ _id: '1', name: 'Product 1' }, { _id: '2', name: 'Product 2' }];
            (Product.find as jest.Mock).mockResolvedValue(mockProducts);

            await getProducts(mockReq as Request, mockRes as Response);

            expect(Product.find).toHaveBeenCalledWith({});
            expect(mockJson).toHaveBeenCalledWith(mockProducts);
        });
    });

    describe('getProductById', () => {
        it('should return 404 if product not found', async () => {
            mockReq.params = { id: 'invalid-id' };
            (Product.findById as jest.Mock).mockResolvedValue(null);

            await getProductById(mockReq as Request, mockRes as Response);

            expect(Product.findById).toHaveBeenCalledWith('invalid-id');
            expect(mockStatus).toHaveBeenCalledWith(404);
            expect(mockJson).toHaveBeenCalledWith({ message: 'Product not found' });
        });

        it('should return product if valid id provided', async () => {
            mockReq.params = { id: 'valid-id' };
            const mockProduct = { _id: 'valid-id', name: 'Valid Product' };
            (Product.findById as jest.Mock).mockResolvedValue(mockProduct);

            await getProductById(mockReq as Request, mockRes as Response);

            expect(Product.findById).toHaveBeenCalledWith('valid-id');
            expect(mockJson).toHaveBeenCalledWith(mockProduct);
        });
    });
});
