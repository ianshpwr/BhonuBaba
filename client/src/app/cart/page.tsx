"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { useState } from "react";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      _id: "1",
      name: "Peach Glow Serum",
      price: 35.0,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      qty: 1,
    },
    {
      _id: "4",
      name: "Peach Lip Tint",
      price: 18.0,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
      qty: 2,
    }
  ]);

  const removeFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-4xl font-bold text-foreground mb-6">Your cart is empty 🍑</h2>
        <Link href="/products">
          <Button size="lg" className="text-lg px-8">Go back shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-10">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 bg-white p-6 rounded-3xl soft-shadow border border-peach-50 transition-all hover:border-peach-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
              <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${item._id}`}>
                  <h3 className="text-xl font-bold text-foreground hover:text-peach-500 transition-colors">{item.name}</h3>
                </Link>
                <p className="text-lg font-semibold text-peach-500 mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-peach-50 px-4 py-2 rounded-2xl font-medium text-foreground">Qty: {item.qty}</span>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white p-8 rounded-3xl soft-shadow border border-peach-100 flex flex-col h-full sticky top-24">
            <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex justify-between text-foreground/80">
                <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-foreground/80">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="border-t border-peach-100 pt-4 mt-4 flex justify-between">
                <span className="text-xl font-bold text-foreground">Total</span>
                <span className="text-3xl font-bold text-peach-500">${total.toFixed(2)}</span>
              </div>
            </div>
            <Button size="lg" fullWidth className="text-lg">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
