import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
}

export const ParticleSystem = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles: Particle[] = [...Array(50)].map((_, i) => ({
      id: i,
      x:
        Math.random() *
        (typeof window !== "undefined" ? window.innerWidth : 1000),
      y:
        Math.random() *
        (typeof window !== "undefined" ? window.innerHeight : 800),
      size: Math.random() * 4 + 1,
      speedX: (Math.random() - 0.5) * 2,
      speedY: (Math.random() - 0.5) * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className='absolute inset-0'>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className='absolute w-1 h-1 bg-blue-400 rounded-full opacity-30'
          animate={{
            x: [particle.x, particle.x + particle.speedX * 100],
            y: [particle.y, particle.y + particle.speedY * 100],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  );
};

export default ParticleSystem;
