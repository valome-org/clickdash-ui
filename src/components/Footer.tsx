"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Footer() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className='py-16 bg-gray-900 text-white relative overflow-hidden'>
      <div className='container mx-auto px-4 text-center'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h3
            className='text-3xl font-bold mb-4'
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 3, repeat: Infinity }}
            style={{
              background:
                "linear-gradient(45deg, #3B82F6, #8B5CF6, #EC4899, #3B82F6)",
              backgroundSize: "300% 300%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ClickDash
          </motion.h3>
          <p className='text-gray-400 mb-8 text-lg'>
            Transform your data, transform your business.
          </p>
          <div className='flex justify-center gap-8 text-gray-400 text-sm'>
            <span>© 2025 ClickDash. All rights reserved.</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>
        </motion.div>
      </div>

      {/* Footer background animation */}
      <div className='absolute inset-0 overflow-hidden'>
        {isClient &&
          [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className='absolute w-2 h-2 bg-blue-500 rounded-full opacity-10'
              style={{
                left: `${(i * 5) % 100}%`,
                top: `${(i * 7) % 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3 + (i % 5),
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
      </div>
    </footer>
  );
}
