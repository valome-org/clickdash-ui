"use client";

import FloatingElement from "@/components/FloatingElement";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  LineChart,
  PieChart,
  Play,
  Sparkles,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <motion.section
      className='container mx-auto px-4 pb-20 min-h-screen flex items-center mt-10'
      style={{ opacity: 1 }}
    >
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto'>
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.div
            className='inline-flex items-center gap-3 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 rounded-full px-6 py-3 mb-8'
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.2)",
            }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className='w-5 h-5 text-blue-600' />
            <span className='text-blue-700 font-bold'>
              AI-Powered Dashboard Generator
            </span>
          </motion.div>

          <motion.h1
            className='text-6xl md:text-7xl font-black mb-8 leading-tight'
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
              ClickDash
            </span>
            <motion.div
              className='text-gray-900 text-4xl md:text-5xl mt-4'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Excel to Dashboard
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                {" "}
                Magic
              </span>
            </motion.div>
          </motion.h1>

          <motion.p
            className='text-xl md:text-2xl text-gray-600 mb-10 leading-relaxed'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Transform your boring spreadsheets into
            <span className='font-bold text-gray-800'>
              {" "}
              stunning, interactive dashboards
            </span>{" "}
            with AI.
            <br />
            <span className='text-lg text-blue-600 font-semibold'>
              No coding. No complexity. Just pure visualization magic. ✨
            </span>
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-6 mb-12'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            <motion.button
              className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-xl px-10 py-5 rounded-2xl font-bold hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all shadow-2xl flex items-center gap-3'
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(59, 130, 246, 0.4)",
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(59, 130, 246, 0.3)",
                  "0 15px 40px rgba(147, 51, 234, 0.3)",
                  "0 10px 30px rgba(236, 72, 153, 0.3)",
                  "0 10px 30px rgba(59, 130, 246, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🚀 Start Creating Magic
              <ArrowRight className='w-6 h-6' />
            </motion.button>

            <motion.button
              className='border-3 border-gray-300 text-gray-700 text-xl px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center gap-3'
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Play className='w-6 h-6' />
              Watch Magic Happen
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Illustration */}
        <motion.div
          initial={{ opacity: 0, x: 100, rotate: 10 }}
          animate={{ opacity: 1, x: 0, rotate: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className='relative'
        >
          <FloatingElement amplitude={30} duration={8}>
            <div className='relative'>
              {/* Main Dashboard */}
              <div className='bg-white rounded-3xl p-8 shadow-2xl border border-gray-200 relative z-10'>
                <div className='flex items-center gap-3 mb-6'>
                  <div className='w-4 h-4 rounded-full bg-red-400'></div>
                  <div className='w-4 h-4 rounded-full bg-yellow-400'></div>
                  <div className='w-4 h-4 rounded-full bg-green-400'></div>
                  <div className='ml-4 text-gray-600 font-semibold'>
                    ClickDash Dashboard
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className='grid grid-cols-2 gap-4 h-80'>
                  <motion.div
                    className='bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-4 flex flex-col justify-between'
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <div className='flex items-center gap-2 mb-3'>
                      <BarChart3 className='w-6 h-6 text-blue-600' />
                      <span className='text-blue-800 font-semibold'>Sales</span>
                    </div>
                    <div className='space-y-2'>
                      <motion.div
                        className='h-3 bg-blue-300 rounded-full'
                        animate={{ width: ["60%", "80%", "60%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className='h-3 bg-blue-400 rounded-full'
                        animate={{ width: ["40%", "70%", "40%"] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                      <motion.div
                        className='h-3 bg-blue-500 rounded-full'
                        animate={{ width: ["70%", "90%", "70%"] }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className='bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4'
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: 0.5,
                    }}
                  >
                    <div className='flex items-center gap-2 mb-3'>
                      <PieChart className='w-6 h-6 text-purple-600' />
                      <span className='text-purple-800 font-semibold'>
                        Analytics
                      </span>
                    </div>
                    <div className='flex items-center justify-center h-24'>
                      <motion.div
                        className='w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-pink-500'
                        animate={{ rotate: [0, 360] }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  </motion.div>

                  <motion.div
                    className='bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 col-span-2'
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  >
                    <div className='flex items-center gap-2 mb-3'>
                      <LineChart className='w-6 h-6 text-green-600' />
                      <span className='text-green-800 font-semibold'>
                        Growth Trends
                      </span>
                    </div>
                    <div className='h-20 flex items-end justify-around'>
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className='bg-green-400 rounded-t-lg'
                          style={{ width: "8px" }}
                          {...(isClient
                            ? {
                                animate: {
                                  height: [
                                    `${20 + i * 5}px`,
                                    `${30 + i * 4}px`,
                                    `${20 + i * 5}px`,
                                  ],
                                },
                                transition: {
                                  duration: 2 + i * 0.2,
                                  repeat: Infinity,
                                  repeatType: "reverse",
                                },
                              }
                            : { style: { height: `${20 + i * 5}px` } })}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Floating elements around dashboard */}
              <FloatingElement delay={0.5} amplitude={15} duration={4}>
                <div className='absolute -top-4 -right-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-4 shadow-lg'>
                  <Sparkles className='w-8 h-8 text-white' />
                </div>
              </FloatingElement>

              <FloatingElement delay={1} amplitude={20} duration={5}>
                <div className='absolute -bottom-6 -left-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-lg'>
                  <Zap className='w-8 h-8 text-white' />
                </div>
              </FloatingElement>
            </div>
          </FloatingElement>
        </motion.div>
      </div>
    </motion.section>
  );
}
