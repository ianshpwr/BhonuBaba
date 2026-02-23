import { motion } from "framer-motion";
import { glowVariants } from "@/animations/motionConfigs";

export default function GlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        variants={glowVariants as any}
        animate="animate"
        className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]"
      />
      <motion.div
        variants={glowVariants as any}
        animate="animate"
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-secondary/5 blur-[150px]"
        style={{ animationDirection: "reverse" }}
      />
    </div>
  );
}
