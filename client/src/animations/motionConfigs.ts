import { motion } from "framer-motion";

export const fadeIn = {
  initial: { opacity: 0, y: 30, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.08
    }
  }
};

export const glowVariants = {
  animate: {
    x: [0, 80, -40, 0],
    y: [0, -40, 40, 0],
    transition: {
      duration: 30,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

export const pageTransition = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -20, filter: "blur(10px)" },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
};

export const buttonClick = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.97 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

export const imageReveal = {
  initial: { clipPath: "inset(100% 0% 0% 0%)" },
  animate: { clipPath: "inset(0% 0% 0% 0%)" },
  transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
};
