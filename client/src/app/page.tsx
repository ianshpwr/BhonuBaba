"use client";

import Link from "next/link";
import Button from "@/components/Button";
import ProductCard from "@/components/ProductCard";

export default function Home() {
  const featuredProducts = [
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
    }
  ];

  return (
    <div className="flex flex-col min-h-screen animate-in fade-in duration-500">
      <section className="relative overflow-hidden py-24 sm:py-32 mb-16 flex items-center justify-center">
        <div className="absolute inset-0 bhonu-gradient opacity-5"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#ff9a8b] rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] text-[#ff9a8b] text-xs font-bold tracking-widest mb-8 uppercase shadow-lg">
            Welcome to the new era
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg leading-tight">
            Embrace the <span className="bhonu-gradient-text drop-shadow-md">BhonuBaba</span>
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-[#b3b3b3] max-w-2xl mx-auto mb-12 font-medium">
            Discover our curated collection of premium dark-themed essentials designed to glow up your everyday life.
          </p>
          <div className="flex justify-center gap-6">
            <Link href="/products">
              <Button size="lg" className="text-lg px-10 h-14">
                Shop Collection
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="text-lg px-10 h-14">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20 relative">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-white tracking-tight">Featured Favorites</h2>
          <Link href="/products" className="bhonu-gradient-text font-bold hover:opacity-80 transition-opacity flex items-center gap-2">
            View All <span className="text-[#ff9a8b]">&rarr;</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
