import { Link } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/product/ProductCard";
import { mockProducts } from "@/lib/mockData";
import { ArrowRight, Truck, Shield, Sparkles } from "lucide-react";
import heroImg from "@/assets/hero.png";
import GlowBackground from "@/components/ui/GlowBackground";
import { motion, useScroll, useTransform } from "framer-motion";
import { fadeIn, staggerContainer, imageReveal } from "@/animations/motionConfigs";
import PageTransition from "@/components/ui/PageTransition";

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.5]);

  return (
    <MainLayout>
      <PageTransition>
        {/* Hero Section */}
        <section className="relative w-full h-[85vh] md:h-[95vh] overflow-hidden flex items-center justify-center">
          <GlowBackground />
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/5 to-background z-10" />
            <motion.div
              variants={imageReveal as any}
              initial="initial"
              animate="animate"
              className="w-full h-full"
            >
              <img 
                src={heroImg} 
                alt="Warm cozy living room" 
                className="w-full h-full object-cover mix-blend-multiply opacity-90"
              />
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn as any}
            className="container relative z-20 px-4 md:px-6 flex flex-col items-center text-center"
          >
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="font-heading font-bold text-5xl md:text-7xl lg:text-9xl tracking-tight text-foreground max-w-5xl leading-[1] mb-8 drop-shadow-sm"
            >
              Make yourself <br />
              at <span className="text-primary italic font-light">home</span>.
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed font-medium bg-background/30 backdrop-blur-md px-8 py-3 rounded-full border border-white/20"
            >
              Soft, warm, and friendly essentials designed to turn your space into a sanctuary.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-12 h-16 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all">
                  Shop the Collection
                </Button>
              </Link>
              <Link href="/drop">
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-lg font-semibold bg-background/50 backdrop-blur-md border-border/40 hover:bg-background">
                  View Latest Drop
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Featured Benefits */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn as any}
          className="py-24 md:py-32 bg-card/10 border-y border-border/20 relative"
        >
          <div className="container px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center text-primary rotate-3 hover:rotate-0 transition-transform duration-300 shadow-inner">
                  <Truck className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-semibold text-2xl">Free shipping</h3>
                <p className="text-muted-foreground leading-relaxed max-w-[280px]">On all orders over $75. Carefully packed and delivered to your door.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-secondary/20 flex items-center justify-center text-secondary-foreground -rotate-3 hover:rotate-0 transition-transform duration-300 shadow-inner">
                  <Sparkles className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-semibold text-2xl">Sustainable materials</h3>
                <p className="text-muted-foreground leading-relaxed max-w-[280px]">Ethically sourced, incredibly soft materials you can feel good about.</p>
              </motion.div>
              <motion.div whileHover={{ y: -10 }} className="flex flex-col items-center space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-accent/20 flex items-center justify-center text-accent-foreground rotate-6 hover:rotate-0 transition-transform duration-300 shadow-inner">
                  <Shield className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-semibold text-2xl">Cozy guarantee</h3>
                <p className="text-muted-foreground leading-relaxed max-w-[280px]">Not soft enough? Return within 30 days for a full refund, no questions asked.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* New Arrivals */}
        <section className="py-32 overflow-hidden">
          <div className="container px-4 md:px-6">
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn as any}
              className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 text-center md:text-left gap-6"
            >
              <div>
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  className="text-primary font-bold tracking-widest uppercase text-sm mb-4 block"
                >
                  Limited Edition
                </motion.span>
                <h2 className="font-heading font-bold text-4xl md:text-6xl tracking-tight mb-4">New Arrivals</h2>
                <p className="text-muted-foreground text-xl max-w-xl">Freshly spun and poured for the season. Discover our latest cozy additions.</p>
              </div>
              <Link href="/shop">
                <Button variant="ghost" className="group hover:bg-transparent text-primary hover:text-primary/80 px-0 text-lg font-bold">
                  Explore All <ArrowRight className="ml-3 w-5 h-5 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div 
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer as any}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-6 gap-y-16"
            >
              {mockProducts.slice(0, 5).map(product => (
                <motion.div key={product.id} variants={fadeIn as any}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Brand Story Snippet */}
        <section className="py-32 bg-secondary/10 relative">
          <div className="container px-4 md:px-6 text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading font-bold text-3xl md:text-5xl mb-8 italic">"Comfort is a feeling, <br /> not just a fabric."</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                We believe the objects we surround ourselves with carry energy. Every Bhonubaba piece is chosen for its ability to bring a moment of peace to your busy day.
              </p>
              <Button variant="outline" className="rounded-full px-10 h-14 font-semibold border-primary/20 hover:border-primary transition-all">
                Our Story
              </Button>
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <motion.section 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeIn as any}
          className="py-32 relative overflow-hidden bg-primary/5 mx-4 md:mx-12 rounded-[3rem] mb-24 mt-24 border border-primary/10"
        >
          <GlowBackground />
          <div className="container relative z-10 px-4 flex flex-col items-center text-center">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="mb-8"
            >
              <Sparkles className="w-12 h-12 text-primary opacity-60" />
            </motion.div>
            <h2 className="font-heading font-bold text-4xl md:text-6xl tracking-tight mb-8 max-w-3xl leading-tight">
              Let's stay warm <br /> together.
            </h2>
            <p className="text-muted-foreground text-xl max-w-lg mb-12">
              Sign up for 10% off your first order, plus early access to new drops and gentle reminders to take a break.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-card/50 backdrop-blur-md border border-border/40 rounded-[2rem] px-8 py-5 text-lg flex-grow focus:outline-none focus:ring-2 focus:ring-primary shadow-lg h-16"
                required
              />
              <Button size="lg" className="rounded-[2rem] h-16 px-10 text-lg font-bold shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                Join Us
              </Button>
            </form>
          </div>
        </motion.section>
      </PageTransition>
    </MainLayout>
  );
}
