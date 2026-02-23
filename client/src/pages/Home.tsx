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
        <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background z-10" />
            <motion.div
              variants={imageReveal as any}
              initial="initial"
              animate="animate"
              className="w-full h-full"
            >
              <img
                src={heroImg}
                alt="Minimal studio space"
                className="w-full h-full object-cover mix-blend-multiply opacity-80"
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn as any}
            className="container-luxury relative z-20 flex flex-col items-center text-center"
          >
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading font-light text-5xl md:text-7xl lg:text-[7rem] tracking-tight text-foreground/90 max-w-5xl leading-[1.05] mb-12"
            >
              Make yourself <br />
              at <span className="text-primary italic font-extralight">home</span>.
            </motion.h1>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted-foreground text-lg md:text-xl max-w-xl mb-14 leading-[1.65] font-light"
            >
              Soft, warm, and friendly essentials designed to turn your space into a sanctuary.
            </motion.p>
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-8"
            >
              <Link href="/shop">
                <Button size="lg" className="rounded-full px-12 h-16 text-base font-medium transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Shop the Collection
                </Button>
              </Link>
              <Link href="/drop">
                <Button size="lg" variant="outline" className="rounded-full px-12 h-16 text-base font-medium bg-background/20 backdrop-blur-sm border-foreground/5 hover:bg-background/40">
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
          className="py-32 md:py-48 relative"
        >
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24 text-center">
              <motion.div className="flex flex-col items-center space-y-8">
                <div className="w-16 h-16 flex items-center justify-center text-primary/60">
                  <Truck className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-heading font-light text-2xl tracking-wide">Free shipping</h3>
                <p className="text-muted-secondary leading-relaxed max-w-[280px] text-sm">On all orders over $75. Carefully packed and delivered to your door.</p>
              </motion.div>
              <motion.div className="flex flex-col items-center space-y-8">
                <div className="w-16 h-16 flex items-center justify-center text-secondary/60">
                  <Sparkles className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-heading font-light text-2xl tracking-wide">Sustainable materials</h3>
                <p className="text-muted-secondary leading-relaxed max-w-[280px] text-sm">Ethically sourced, incredibly soft materials you can feel good about.</p>
              </motion.div>
              <motion.div className="flex flex-col items-center space-y-8">
                <div className="w-16 h-16 flex items-center justify-center text-accent/60">
                  <Shield className="w-8 h-8 stroke-[1.2]" />
                </div>
                <h3 className="font-heading font-light text-2xl tracking-wide">Cozy guarantee</h3>
                <p className="text-muted-secondary leading-relaxed max-w-[280px] text-sm">Not soft enough? Return within 30 days for a full refund, no questions asked.</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* New Arrivals */}
        <section className="py-24 md:py-40">
          <div className="container-luxury">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={fadeIn as any}
              className="flex flex-col md:flex-row justify-between items-center md:items-end mb-24 text-center md:text-left gap-8"
            >
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-primary/70 font-medium tracking-[0.2em] uppercase text-xs mb-6 block"
                >
                  Limited Edition
                </motion.span>
                <h2 className="font-heading font-light text-4xl md:text-6xl tracking-tight mb-6">New Arrivals</h2>
                <p className="text-muted-foreground text-lg max-w-xl leading-[1.65]">Freshly spun and poured for the season. Discover our latest additions.</p>
              </div>
              <Link href="/shop">
                <Button variant="ghost" className="group hover:bg-transparent text-primary/80 hover:text-primary transition-colors px-0 text-base font-medium">
                  Explore All <ArrowRight className="ml-4 w-4 h-4 transition-transform group-hover:translate-x-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              variants={staggerContainer as any}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-8 gap-y-20"
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
        <section className="py-48 bg-card/5 relative">
          <div className="container-luxury text-center max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="font-heading font-light text-3xl md:text-5xl mb-12 italic opacity-80">"Comfort is a feeling, <br /> not just a fabric."</h2>
              <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed mb-16">
                We believe the objects we surround ourselves with carry energy. Every Bhonubaba piece is chosen for its ability to bring a moment of peace.
              </p>
              <Button variant="outline" className="rounded-full px-12 h-14 text-sm font-medium border-primary/10 hover:border-primary/40 transition-all">
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
          className="py-40 relative overflow-hidden bg-primary/5 mx-4 md:mx-20 rounded-[4rem] mb-32 mt-32 border border-primary/5"
        >
          <div className="container-luxury relative z-10 flex flex-col items-center text-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="mb-10"
            >
              <Sparkles className="w-10 h-10 text-primary opacity-40 stroke-[1]" />
            </motion.div>
            <h2 className="font-heading font-light text-4xl md:text-6xl tracking-tight mb-10 max-w-3xl leading-tight">
              Let's stay warm <br /> together.
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mb-16 font-light">
              Sign up for 10% off your first order, plus early access to new drops and gentle reminders to take a break.
            </p>
            <form className="flex flex-col sm:flex-row gap-5 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email address"
                className="bg-background/40 backdrop-blur-sm border border-foreground/5 rounded-full px-10 py-5 text-base flex-grow focus:outline-none focus:ring-1 focus:ring-primary/20 shadow-sm h-16"
                required
              />
              <Button size="lg" className="rounded-full h-16 px-12 text-base font-medium shadow-md hover:shadow-lg transition-all">
                Join Us
              </Button>
            </form>
          </div>
        </motion.section>
      </PageTransition>
    </MainLayout>
  );
}
