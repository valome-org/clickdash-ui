"use client";

import FloatingElement from "@/components/FloatingElement";
import { ROUTES } from "@/lib/routes";
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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
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
              onClick={() => router.push(ROUTES.LOGIN)}
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
                <div className='space-y-6'>
                  <div className='flex items-center gap-3 mb-4'>
                    <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                      <BarChart3 className='w-5 h-5 text-blue-600' />
                    </div>
                    <div>
                      <div className='font-semibold text-gray-800'>
                        Sales Overview
                      </div>
                      <div className='text-sm text-gray-500'>
                        Monthly Performance
                      </div>
                    </div>
                  </div>

                  <div className='grid grid-cols-3 gap-4'>
                    <div className='bg-blue-50 rounded-lg p-4 text-center'>
                      <div className='text-2xl font-bold text-blue-600'>
                        $42K
                      </div>
                      <div className='text-sm text-gray-600'>Revenue</div>
                    </div>
                    <div className='bg-green-50 rounded-lg p-4 text-center'>
                      <div className='text-2xl font-bold text-green-600'>
                        +18%
                      </div>
                      <div className='text-sm text-gray-600'>Growth</div>
                    </div>
                    <div className='bg-purple-50 rounded-lg p-4 text-center'>
                      <div className='text-2xl font-bold text-purple-600'>
                        234
                      </div>
                      <div className='text-sm text-gray-600'>Orders</div>
                    </div>
                  </div>

                  <div className='flex gap-4 items-center'>
                    <div className='flex-1 bg-gray-100 rounded-lg p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <LineChart className='w-4 h-4 text-blue-600' />
                        <span className='text-sm font-medium'>Trend Line</span>
                      </div>
                      <div className='h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded opacity-70'></div>
                    </div>
                    <div className='flex-1 bg-gray-100 rounded-lg p-4'>
                      <div className='flex items-center gap-2 mb-2'>
                        <PieChart className='w-4 h-4 text-green-600' />
                        <span className='text-sm font-medium'>Distribution</span>
                      </div>
                      <div className='w-8 h-8 bg-gradient-to-r from-green-500 to-blue-600 rounded-full opacity-70'></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className='absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl z-20'
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className='w-6 h-6 text-white' />
              </motion.div>

              <motion.div
                className='absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-pink-500 to-red-600 rounded-2xl flex items-center justify-center shadow-xl z-20'
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Zap className='w-8 h-8 text-white' />
              </motion.div>

              <motion.div
                className='absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl z-20'
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <BarChart3 className='w-5 h-5 text-white' />
              </motion.div>
            </div>
          </FloatingElement>
        </motion.div>
      </div>
    </motion.section>
  );
}
