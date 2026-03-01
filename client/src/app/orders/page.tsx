"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "@/components/Button";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock orders
    setTimeout(() => {
      setOrders([
        {
          _id: "ord_103429",
          createdAt: "2023-11-20T10:30:00Z",
          totalPrice: 53.00,
          status: "Delivered",
        },
        {
          _id: "ord_294811",
          createdAt: "2024-02-15T14:45:00Z",
          totalPrice: 70.00,
          status: "Processing",
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-16 h-16 border-4 border-peach-200 border-t-peach-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-extrabold text-foreground tracking-tight mb-10">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-peach-50 soft-shadow">
          <p className="text-lg text-foreground/70 mb-6">You haven't placed any orders yet.</p>
          <Link href="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-6 sm:p-8 rounded-3xl soft-shadow border border-peach-50 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:border-peach-200">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Order #{order._id}</p>
                <p className="text-lg font-bold text-foreground mb-2">
                  {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-peach-500 font-bold">${order.totalPrice.toFixed(2)}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-peach-200"></span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-peach-100 text-peach-700'}`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <Button variant="outline" size="sm">View Details</Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
