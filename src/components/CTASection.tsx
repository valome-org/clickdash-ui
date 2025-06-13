"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Rocket } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CTASection() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className='pt-12 pb-32 relative overflow-hidden'>
      <div className='container mx-auto px-4 max-w-4xl text-center'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className='inline-flex items-center gap-3 bg-gradient-to-r from-orange-100 to-red-100 border border-orange-200 rounded-full px-6 py-3 mb-8'
            whileHover={{ scale: 1.05 }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className='w-5 h-5 text-orange-600' />
            <span className='text-orange-700 font-bold'>Ready to Launch?</span>
          </motion.div>

          <motion.h2
            className='text-5xl md:text-7xl font-black mb-8'
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className='bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent'>
              Start Your
            </span>
            <div className='text-gray-900'>Data Magic Today</div>
          </motion.h2>

          <motion.p
            className='text-xl md:text-2xl text-gray-600 mb-12 leading-relaxed'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Transform your Excel files into stunning dashboards in minutes.
            <br />
            <span className='font-bold text-gray-800'>
              No credit card required. Start free today!
            </span>
          </motion.p>

          <motion.div
            className='flex flex-col sm:flex-row gap-6 justify-center mb-12'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.button
              onClick={() => router.push("/login")}
              className='bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 text-white text-xl px-12 py-6 rounded-2xl font-bold hover:from-orange-700 hover:via-red-700 hover:to-pink-700 transition-all shadow-2xl flex items-center gap-3 mx-auto sm:mx-0'
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px rgba(234, 88, 12, 0.4)",
                y: -5,
              }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "0 10px 30px rgba(234, 88, 12, 0.3)",
                  "0 15px 40px rgba(220, 38, 38, 0.3)",
                  "0 10px 30px rgba(236, 72, 153, 0.3)",
                  "0 10px 30px rgba(234, 88, 12, 0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🎯 Get Started Free
              <ArrowRight className='w-6 h-6' />
            </motion.button>
          </motion.div>

          <motion.div
            className='grid grid-cols-1 md:grid-cols-3 gap-8 text-center'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <div className='flex flex-col items-center'>
              <CheckCircle className='w-8 h-8 text-green-500 mb-3' />
              <span className='text-gray-600 font-semibold'>
                Free Forever Plan
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <CheckCircle className='w-8 h-8 text-green-500 mb-3' />
              <span className='text-gray-600 font-semibold'>
                No Credit Card Required
              </span>
            </div>
            <div className='flex flex-col items-center'>
              <CheckCircle className='w-8 h-8 text-green-500 mb-3' />
              <span className='text-gray-600 font-semibold'>
                Setup in 30 Seconds
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        {isClient && (
          <>
            <motion.div
              className='absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-orange-100 to-pink-100 rounded-full opacity-20'
              animate={{ rotate: [0, 360] }}
              transition={{
                duration: 50,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <motion.div
              className='absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20'
              animate={{ rotate: [360, 0] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </>
        )}
      </div>
    </section>
  );
}
