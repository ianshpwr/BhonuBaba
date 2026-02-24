import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";
import { pageTransition } from "@/animations/motionConfigs";
import { useLocation } from "wouter";

export default function PageTransition({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  const config = pageTransition as any;
  
  return (
    <AnimatePresence mode="wait" initial={true}>
      <motion.div
        key={location}
        initial={config.initial}
        animate={config.animate}
        exit={config.exit}
        transition={config.transition}
        style={{ width: "100%", position: "relative" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
