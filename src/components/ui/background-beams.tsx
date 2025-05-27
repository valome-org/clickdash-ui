"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (event: MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      });
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener("mousemove", handleMouseMove);
      return () => element.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className='absolute inset-0 h-full w-full'
        width='100%'
        height='100%'
        viewBox='0 0 400 400'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g clipPath='url(#clip)'>
          <g opacity='0.5'>
            <motion.circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r='50'
              fill='url(#gradient)'
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            />
          </g>
        </g>
        <defs>
          <clipPath id='clip'>
            <rect width='400' height='400' />
          </clipPath>
          <radialGradient id='gradient'>
            <stop offset='0%' stopColor='rgba(56, 189, 248, 0.3)' />
            <stop offset='100%' stopColor='transparent' />
          </radialGradient>
        </defs>
      </svg>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50' />
    </div>
  );
};
