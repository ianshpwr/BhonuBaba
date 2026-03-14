import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ProductCard from '@/components/ProductCard';

const mockProduct = {
    _id: '1',
    name: 'Test Product',
    image: '/test-image.jpg',
    description: 'A great test product',
    brand: 'TestBrand',
    category: 'Testing',
    price: 99.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
};

describe('ProductCard Component', () => {
    it('renders product details correctly', () => {
        render(<ProductCard product={mockProduct} />);

        // Check if name is rendered
        expect(screen.getByText('Test Product')).toBeInTheDocument();

        // Check if price is rendered formatted (assuming $99.99 format)
        expect(screen.getByText(/\$99\.99/)).toBeInTheDocument();
    });

    it('renders product image with correct src and alt', () => {
        render(<ProductCard product={mockProduct} />);
        
        const image = screen.getByRole('img', { name: /Test Product/i });
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', expect.stringContaining('test-image.jpg'));
    });
});
