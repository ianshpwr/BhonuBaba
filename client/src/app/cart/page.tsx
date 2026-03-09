"use client";

import Link from "next/link";
import Button from "@/components/Button";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartCount, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please log in to place an order", { style: { background: '#1f1f1f', color: '#ff9a8b' } });
      router.push("/auth/login?redirect=/cart");
      return;
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          orderItems: cartItems.map(i => ({ name: i.name, qty: i.qty, image: i.image, price: i.price, product: i._id })),
          totalPrice: cartTotal,
        }),
      });

      if (res.ok) {
        toast.success("Order placed successfully!");
        clearCart();
        router.push("/orders");
      } else {
        toast.error("Failed to place order.");
      }
    } catch (err) {
      toast.error("Server error. Try again later.");
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h2 className="text-4xl font-extrabold text-white mb-6">Your cart is empty</h2>
        <Link href="/products">
          <Button size="lg" className="text-lg px-8">Go back shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-4xl font-extrabold text-white tracking-tight mb-10">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3 space-y-6">
          {cartItems.map((item) => (
            <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 glass-card p-6 transition-all hover:border-[#ff9a8b]/50">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-2xl" />
              <div className="flex-grow text-center sm:text-left">
                <Link href={`/products/${item._id}`}>
                  <h3 className="text-xl font-bold text-white hover:text-[#ff9a8b] transition-colors">{item.name}</h3>
                </Link>
                <p className="text-lg font-semibold bhonu-gradient-text mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#1a1a1a] rounded-2xl flex items-center border border-[#2a2a2a]">
                  <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="p-3 text-[#b3b3b3] hover:text-white transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium text-white w-6 text-center">{item.qty}</span>
                  <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="p-3 text-[#b3b3b3] hover:text-white transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-colors"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:w-1/3">
          <div className="glass-card p-8 flex flex-col h-full sticky top-24">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex justify-between text-[#b3b3b3]">
                <span>Subtotal ({cartCount} items)</span>
                <span className="font-medium text-white">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#b3b3b3]">
                <span>Shipping</span>
                <span className="font-medium text-white">Free</span>
              </div>
              <div className="border-t border-[#2a2a2a] pt-4 mt-4 flex justify-between">
                <span className="text-xl font-bold text-white">Total</span>
                <span className="text-3xl font-bold bhonu-gradient-text">${cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <Button size="lg" fullWidth className="text-lg" onClick={handleCheckout}>
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
