"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/myorders`, {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setOrders(data);
        else setOrders([]);
      })
      .catch(() => setOrders([]))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="flex h-[60vh] items-center justify-center">
          <div className="w-16 h-16 border-4 border-[#2a2a2a] border-t-[#ff9a8b] rounded-full animate-spin"></div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-4xl font-extrabold text-white tracking-tight mb-10">Order History</h1>
        
        {orders.length === 0 ? (
          <div className="text-center py-20 glass-card">
            <div className="text-6xl mb-6">📦</div>
            <p className="text-xl text-[#b3b3b3] mb-8 font-medium">You haven't placed any orders yet.</p>
            <Link href="/products">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="glass-card p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-[#ff9a8b]/30">
                <div>
                  <p className="text-sm text-[#b3b3b3] mb-1 font-mono">Order ID: {order._id}</p>
                  <p className="text-lg font-bold text-white mb-3">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                  <div className="flex items-center gap-4">
                    <span className="text-[#ff9a8b] font-bold text-xl">${order.totalPrice.toFixed(2)}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2a2a2a]"></span>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${order.status === 'Delivered' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-[#ff9a8b]/10 text-[#ff9a8b] border border-[#ff9a8b]/20'}`}>
                      {order.status || 'Pending'}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="hidden sm:inline-flex">View Details</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
