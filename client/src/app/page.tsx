import Image from "next/image";
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
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden peach-gradient py-24 sm:py-32 rounded-b-3xl soft-shadow mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-[#4a3b32] tracking-tight mb-6">
            Embrace the <span className="text-white drop-shadow-md">Peach Aesthetic</span>
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-[#6b584b] max-w-2xl mx-auto mb-10 font-medium">
            Discover our curated collection of soft, pastel, and peach-themed essentials designed to glow up your everyday life.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/products">
              <Button size="lg" className="text-lg px-10 border-white bg-white/90 text-peach-500 hover:bg-white hover:shadow-xl">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold text-foreground">Featured Favorites</h2>
          <Link href="/products" className="text-peach-500 font-semibold hover:text-peach-400 transition-colors">
            View All &rarr;
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
