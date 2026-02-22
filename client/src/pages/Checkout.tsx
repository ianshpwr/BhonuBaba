import { Link } from "wouter";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeIn } from "@/animations/motionConfigs";
import GlowBackground from "@/components/ui/GlowBackground";
import PageTransition from "@/components/ui/PageTransition";

export default function Checkout() {
  return (
    <MainLayout>
      <PageTransition>
        <div className="container px-4 md:px-6 py-12 md:py-16 max-w-4xl relative min-h-[60vh]">
          <GlowBackground />
          <motion.div
            initial="initial"
            animate="animate"
            variants={fadeIn as any}
          >
            <h1 className="font-heading font-bold text-4xl tracking-tight mb-8">Checkout</h1>
            
            <div className="bg-card/50 border border-border/40 rounded-3xl p-8 md:p-12 text-center flex flex-col items-center justify-center min-h-[40vh] backdrop-blur-sm">
              <motion.div 
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6"
              >
                <span className="text-4xl text-primary font-bold">✨</span>
              </motion.div>
              <h2 className="font-heading text-2xl font-bold mb-4">You're almost cozy!</h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-md">
                This is a beautiful mockup for the Bhonubaba storefront. Checkout functionality is not implemented in this prototype.
              </p>
              <Link href="/">
                <Button className="h-14 px-8 rounded-2xl text-lg font-medium shadow-md hover:shadow-xl transition-all active:scale-[0.98]">
                  Return Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </PageTransition>
    </MainLayout>
  );
}
