import { motion } from "framer-motion";
import { ReactNode } from "react";

interface FloatingElementProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  amplitude?: number;
}

export const FloatingElement = ({
  children,
  delay = 0,
  duration = 6,
  amplitude = 20,
}: FloatingElementProps) => (
  <motion.div
    animate={{
      y: [0, -amplitude, 0],
      rotate: [0, 5, 0, -5, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

export default FloatingElement;
