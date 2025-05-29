import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Brain, FileSpreadsheet, Play, Rocket } from "lucide-react";
import { useEffect, useState } from "react";

interface StepItem {
  icon: React.ElementType;
  text: string;
  color: string;
  description: string;
  bgColor: string;
}

export const InteractiveDemo = () => {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps: StepItem[] = [
    {
      icon: FileSpreadsheet,
      text: "Upload Excel File",
      color: "from-green-500 to-emerald-500",
      description: "Drag & drop your Excel files",
      bgColor: "bg-green-50",
    },
    {
      icon: Brain,
      text: "AI Analysis",
      color: "from-blue-500 to-cyan-500",
      description: "AI processes your data intelligently",
      bgColor: "bg-blue-50",
    },
    {
      icon: BarChart3,
      text: "Generate Dashboard",
      color: "from-purple-500 to-pink-500",
      description: "Beautiful charts created instantly",
      bgColor: "bg-purple-50",
    },
    {
      icon: Rocket,
      text: "Share & Collaborate",
      color: "from-orange-500 to-red-500",
      description: "Share with your team seamlessly",
      bgColor: "bg-orange-50",
    },
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, steps.length]);

  return (
    <div className='relative'>
      <motion.div
        className='bg-white/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 shadow-2xl'
        whileHover={{ scale: 1.02, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.3 }}
      >
        <div className='flex items-center justify-between mb-8'>
          <div>
            <h3 className='text-3xl font-bold text-gray-900 mb-2'>
              See The Magic
            </h3>
            <p className='text-gray-600'>
              Watch your data transform in real-time
            </p>
          </div>
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            className='flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg'
            whileHover={{
              scale: 1.05,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className='w-5 h-5' />
            <span className='font-semibold'>
              {isPlaying ? "Playing..." : "Start Demo"}
            </span>
          </motion.button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
          {steps.map((stepItem, index) => (
            <motion.div
              key={index}
              className={`relative p-6 rounded-2xl border-2 transition-all duration-500 cursor-pointer ${
                step === index
                  ? `border-blue-400 ${stepItem.bgColor} shadow-lg scale-105`
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
              onHoverStart={() => setHoveredStep(index)}
              onHoverEnd={() => setHoveredStep(null)}
              whileHover={{ y: -5 }}
              animate={{
                scale: step === index ? 1.05 : 1,
              }}
            >
              <motion.div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${stepItem.color} flex items-center justify-center mb-4 mx-auto shadow-lg`}
                animate={{
                  rotate: step === index ? [0, 360] : 0,
                  scale: step === index ? [1, 1.1, 1] : 1,
                }}
                transition={{ duration: 0.8 }}
              >
                <stepItem.icon className='w-8 h-8 text-white' />
              </motion.div>

              <h4 className='text-center text-lg font-bold text-gray-900 mb-2'>
                {stepItem.text}
              </h4>

              <AnimatePresence>
                {(step === index || hoveredStep === index) && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className='text-center text-sm text-gray-600'
                  >
                    {stepItem.description}
                  </motion.p>
                )}
              </AnimatePresence>

              {step === index && (
                <motion.div
                  className='absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className='mt-8'>
          <div className='flex justify-between items-center mb-2'>
            <span className='text-sm text-gray-500'>Progress</span>
            <span className='text-sm font-semibold text-gray-700'>
              {Math.round(((step + 1) / steps.length) * 100)}%
            </span>
          </div>
          <motion.div className='h-3 bg-gray-200 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'
              initial={{ width: "0%" }}
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveDemo;
