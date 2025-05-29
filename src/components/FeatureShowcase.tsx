import { AnimatePresence, motion } from "framer-motion";
import { BarChart3, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";

export const FeatureShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Smart Data Processing",
      description:
        "Our AI automatically detects data patterns and suggests the best visualizations for your Excel data.",
      preview: <BarChart3 className='w-full h-full text-blue-500' />,
    },
    {
      title: "Real-time Collaboration",
      description:
        "Work together with your team in real-time, with live updates and shared dashboards.",
      preview: <Users className='w-full h-full text-green-500' />,
    },
    {
      title: "Lightning Fast Performance",
      description:
        "Process thousands of rows in seconds with our optimized data processing engine.",
      preview: <Zap className='w-full h-full text-yellow-500' />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
      <div>
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className='text-3xl font-bold text-gray-900 mb-4'>
              {features[activeFeature].title}
            </h3>
            <p className='text-xl text-gray-600 mb-6'>
              {features[activeFeature].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className='flex gap-3'>
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveFeature(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeFeature ? "bg-blue-500 w-8" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <motion.div
        className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl p-12 flex items-center justify-center'
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={activeFeature}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
            transition={{ duration: 0.5 }}
            className='w-32 h-32'
          >
            {features[activeFeature].preview}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default FeatureShowcase;
