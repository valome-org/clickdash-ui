import { motion } from "framer-motion";

export const AnimatedBackground = () => (
  <div className='absolute inset-0 overflow-hidden'>
    {/* Floating geometric shapes */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className={`absolute rounded-full ${
          i % 3 === 0
            ? "bg-gradient-to-r from-blue-200 to-cyan-200"
            : i % 3 === 1
            ? "bg-gradient-to-r from-purple-200 to-pink-200"
            : "bg-gradient-to-r from-green-200 to-emerald-200"
        }`}
        style={{
          width: Math.random() * 150 + 50,
          height: Math.random() * 150 + 50,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          opacity: 0.3,
        }}
        animate={{
          x: [0, Math.random() * 100 - 50],
          y: [0, Math.random() * 100 - 50],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: Math.random() * 20 + 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    ))}

    {/* Grid pattern */}
    <div
      className='absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50'
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

export default AnimatedBackground;
