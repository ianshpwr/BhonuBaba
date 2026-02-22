import { Link } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer } from "@/animations/motionConfigs";
import GlowBackground from "@/components/ui/GlowBackground";
import PageTransition from "@/components/ui/PageTransition";
import { useState, useEffect } from "react";

export default function DropLaunch() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 45,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MainLayout>
      <PageTransition>
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4">
          <GlowBackground />
          
          <div className="container relative z-10 max-w-4xl text-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer as any}
              className="space-y-12"
            >
              <motion.div variants={fadeIn as any} className="space-y-6">
                <Badge className="bg-primary/20 text-primary border-none px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase">
                  Coming Soon
                </Badge>
                <h1 className="font-heading font-bold text-5xl md:text-8xl tracking-tight text-foreground leading-tight">
                  The <span className="text-primary italic">Solstice</span> Drop
                </h1>
                <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed">
                  Our most limited collection yet. Crafted for the quiet moments between the seasons.
                </p>
              </motion.div>

              <motion.div 
                variants={fadeIn as any}
                className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-2xl mx-auto"
              >
                {Object.entries(timeLeft).map(([label, value]) => (
                  <div key={label} className="bg-card/40 backdrop-blur-md border border-border/40 p-6 rounded-3xl">
                    <div className="text-3xl md:text-5xl font-bold font-heading text-primary mb-2">
                      {value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-xs md:text-sm text-muted-foreground uppercase tracking-widest font-medium">
                      {label}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={fadeIn as any} className="space-y-8">
                <p className="text-muted-foreground font-medium">Be the first to know when we go live.</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-grow h-14 rounded-2xl px-6 bg-card/60 border-border/40 backdrop-blur-sm focus:ring-2 focus:ring-primary outline-none transition-all"
                  />
                  <Button className="h-14 px-8 rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl">
                    Get Access
                  </Button>
                </form>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </PageTransition>
    </MainLayout>
  );
}

function Badge({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${className}`}>
      {children}
    </span>
  );
}
