import { motion } from "framer-motion";
import React from "react";

interface MetricCardProps {
  icon: React.ElementType;
  value: string;
  label: string;
  color: string;
  delay: number;
}

export const MetricCard = ({
  icon: Icon,
  value,
  label,
  color,
  delay,
}: MetricCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05, y: -5 }}
    className='bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all'
  >
    <div
      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${color} flex items-center justify-center mb-4`}
    >
      <Icon className='w-6 h-6 text-white' />
    </div>
    <motion.div
      className='text-3xl font-bold text-gray-900 mb-1'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: delay + 0.5 }}
    >
      {value}
    </motion.div>
    <div className='text-gray-600 font-medium'>{label}</div>
  </motion.div>
);

export default MetricCard;
