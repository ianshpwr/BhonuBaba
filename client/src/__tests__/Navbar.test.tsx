import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      prefetch: jest.fn(),
    };
  },
  usePathname() {
    return '/';
  }
}));

describe('Navbar Component', () => {
    it('renders login link when user is not authenticated', () => {
        // Render Navbar within providers, defaulting to unauthenticated state
        render(
            <AuthProvider>
                <CartProvider>
                    <Navbar />
                </CartProvider>
            </AuthProvider>
        );

        expect(screen.getByText(/log in/i)).toBeInTheDocument();
        expect(screen.queryByText(/logout/i)).not.toBeInTheDocument();
    });
});
