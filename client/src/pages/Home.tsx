import { Link } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { ArrowRight, Truck, Shield, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.png";

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] md:h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/10 to-background z-10" />
          <img 
            src={heroImg} 
            alt="Warm cozy living room" 
            className="w-full h-full object-cover animate-in fade-in duration-1000 mix-blend-multiply opacity-90"
          />
        </div>
        
        <div className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center animate-in slide-in-from-bottom-8 duration-700 delay-150 fill-mode-both">
          <h1 className="font-heading font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground max-w-4xl leading-[1.1] mb-6 drop-shadow-sm">
            Make yourself at <span className="text-primary italic font-light">home</span>.
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed font-medium bg-background/50 backdrop-blur-sm px-6 py-2 rounded-full">
            Soft, warm, and friendly essentials designed to turn your space into a sanctuary.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/shop">
              <Button size="lg" className="rounded-full px-8 h-14 text-base font-semibold shadow-lg hover:shadow-xl transition-all active:scale-[0.98]">
                Shop the Collection
              </Button>
            </Link>
            <Link href="/drop">
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold bg-background/50 backdrop-blur-md border-border/40 hover:bg-background">
                View Latest Drop
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Benefits */}
      <section className="py-16 md:py-24 bg-card/30 border-y border-border/40">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-border/40">
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-6 text-primary">
                <Truck className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Free shipping</h3>
              <p className="text-muted-foreground text-sm max-w-[250px]">On all orders over $75. Carefully packed and delivered to your door.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-secondary/30 flex items-center justify-center mb-6 text-secondary-foreground">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Sustainable materials</h3>
              <p className="text-muted-foreground text-sm max-w-[250px]">Ethically sourced, incredibly soft materials you can feel good about.</p>
            </div>
            <div className="flex flex-col items-center pt-8 md:pt-0">
              <div className="w-16 h-16 rounded-full bg-accent/30 flex items-center justify-center mb-6 text-accent-foreground">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-semibold text-xl mb-3">Cozy guarantee</h3>
              <p className="text-muted-foreground text-sm max-w-[250px]">Not soft enough? Return within 30 days for a full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-heading font-bold text-3xl md:text-4xl tracking-tight mb-4">New Arrivals</h2>
              <p className="text-muted-foreground max-w-xl">Freshly spun and poured for the season. Discover our latest cozy additions.</p>
            </div>
            <Link href="/shop">
              <Button variant="ghost" className="hidden md:flex group hover:bg-transparent text-primary hover:text-primary/80 px-0">
                View all <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-10 md:gap-x-6">
            {mockProducts.slice(0, 5).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="mt-12 flex justify-center md:hidden">
            <Link href="/shop">
              <Button variant="outline" className="rounded-xl w-full max-w-sm">
                View all products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-32 relative overflow-hidden bg-primary/10 mx-4 md:mx-12 rounded-3xl mb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-50" />
        <div className="container relative z-10 px-4 flex flex-col items-center text-center">
          <h2 className="font-heading font-bold text-3xl md:text-5xl tracking-tight mb-6 max-w-2xl leading-tight">
            Let's stay warm together.
          </h2>
          <p className="text-muted-foreground md:text-lg max-w-lg mb-10">
            Sign up for 10% off your first order, plus early access to new drops and gentle reminders to take a break.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-card border-border rounded-2xl px-6 py-4 text-base flex-grow focus:outline-none focus:ring-2 focus:ring-primary shadow-sm h-14"
              required
            />
            <Button size="lg" className="rounded-2xl h-14 px-8 font-semibold shadow-sm hover:shadow-md transition-all">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
