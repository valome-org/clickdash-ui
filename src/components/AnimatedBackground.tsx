import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ShapeProps {
  index: number;
}

export const AnimatedBackground = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className='absolute inset-0 overflow-hidden'>
      {/* Only render the animated shapes on the client side */}
      {isClient &&
        [...Array(12)].map((_, i) => <AnimatedShape key={i} index={i} />)}

      {/* Grid pattern - static, safe to render on server */}
      <div
        className='absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

// Move the random elements to a client-only component
const AnimatedShape = ({ index }: ShapeProps) => {
  // Generate random values but only once per component instance
  const [randomValues] = useState(() => ({
    width: Math.random() * 150 + 50,
    height: Math.random() * 150 + 50,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    xMove: Math.random() * 100 - 50,
    yMove: Math.random() * 100 - 50,
    duration: Math.random() * 20 + 15,
  }));

  return (
    <motion.div
      className={`absolute rounded-full ${
        index % 3 === 0
          ? "bg-gradient-to-r from-blue-200 to-cyan-200"
          : index % 3 === 1
          ? "bg-gradient-to-r from-purple-200 to-pink-200"
          : "bg-gradient-to-r from-green-200 to-emerald-200"
      }`}
      style={{
        width: randomValues.width,
        height: randomValues.height,
        left: randomValues.left,
        top: randomValues.top,
        opacity: 0.3,
      }}
      animate={{
        x: [0, randomValues.xMove],
        y: [0, randomValues.yMove],
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: randomValues.duration,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    />
  );
};

export default AnimatedBackground;
