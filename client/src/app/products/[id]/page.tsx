"use client";

import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data._id) setProduct(data);
        else setProduct(getMockProduct(id as string));
      })
      .catch(() => setProduct(getMockProduct(id as string)));
  }, [id]);

  if (!product) return (
    <div className="flex h-[60vh] items-center justify-center">
      <div className="w-16 h-16 border-4 border-peach-200 border-t-peach-500 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row gap-12 bg-white p-8 sm:p-12 rounded-[2.5rem] soft-shadow border border-peach-50">
        <div className="md:w-1/2 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="w-full h-auto object-cover rounded-3xl soft-shadow transition-transform hover:scale-[1.02] duration-500" />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">{product.name}</h1>
          <p className="text-3xl text-peach-500 font-bold mb-8">${product.price?.toFixed(2)}</p>
          <div className="bg-peach-50/50 p-6 rounded-2xl mb-10 border border-peach-100">
            <h3 className="font-semibold text-foreground mb-3 text-lg">Details</h3>
            <p className="text-foreground/80 leading-relaxed text-lg">{product.description}</p>
          </div>
          <div className="mt-auto flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg flex-1">Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function getMockProduct(id: string) {
  return {
    _id: id,
    name: "Peach Glow Serum (Sample)",
    price: 35.0,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&q=80",
    description: "A hydrating serum that gives you a perfectly peach-kissed glow. Softens and revitalizes your skin with an effortless sheen. Perfect for your everyday aesthetic.",
  };
}
