"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5001/api/products")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(getMockProducts());
        }
      })
      .catch(() => {
        setProducts(getMockProducts());
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="w-16 h-16 border-4 border-peach-200 border-t-peach-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-4xl font-bold text-foreground tracking-tight">All Goodies</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

function getMockProducts() {
  return [
    {
      _id: "1",
      name: "Peach Glow Serum",
      price: 35.0,
      image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
      description: "A hydrating serum that gives you a perfectly peach-kissed glow.",
    },
    {
      _id: "2",
      name: "Pastel Dream Palette",
      price: 45.0,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
      description: "Blendable pastel colors for every everyday aesthetic.",
    },
    {
      _id: "3",
      name: "Soft Cloud Moisturizer",
      price: 28.5,
      image: "https://images.unsplash.com/photo-1617897903246-719242758050?w=800&q=80",
      description: "Lock in hydration with this lightweight, cloud-like cream.",
    },
    {
      _id: "4",
      name: "Peach Lip Tint",
      price: 18.0,
      image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&q=80",
      description: "A soft lip tint for a natural peach look.",
    }
  ];
}
