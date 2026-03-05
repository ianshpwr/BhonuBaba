"use client";

import { AuthProvider } from "./AuthContext";
import { CartProvider } from "./CartContext";
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1f1f1f',
              color: '#ffffff',
              border: '1px solid #2a2a2a',
              borderRadius: '12px'
            }
          }}
        />
      </CartProvider>
    </AuthProvider>
  );
}
