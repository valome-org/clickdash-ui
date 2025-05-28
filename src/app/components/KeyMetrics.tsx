import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  BarChart,
  DollarSign,
  Percent,
  TrendingUp,
  Users,
} from "lucide-react";

interface KeyMetric {
  metric: string;
  value: string;
  description: string;
}

interface KeyMetricsProps {
  metrics: KeyMetric[];
}

export default function KeyMetrics({ metrics }: KeyMetricsProps) {
  if (!metrics || metrics.length === 0) return null;

  // Function to select an appropriate icon based on the metric name
  const getMetricIcon = (metricName: string) => {
    const name = metricName.toLowerCase();
    if (name.includes("growth") || name.includes("increase"))
      return <ArrowUp className='w-5 h-5' />;
    if (name.includes("decrease") || name.includes("reduction"))
      return <ArrowDown className='w-5 h-5' />;
    if (name.includes("rate") || name.includes("percentage"))
      return <Percent className='w-5 h-5' />;
    if (
      name.includes("revenue") ||
      name.includes("sales") ||
      name.includes("cost")
    )
      return <DollarSign className='w-5 h-5' />;
    if (
      name.includes("users") ||
      name.includes("customers") ||
      name.includes("clients")
    )
      return <Users className='w-5 h-5' />;
    if (name.includes("average") || name.includes("mean"))
      return <BarChart className='w-5 h-5' />;
    return <TrendingUp className='w-5 h-5' />;
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
      {metrics.map((metric, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className='bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm border border-blue-100/30 dark:border-blue-800/30 rounded-xl p-6 hover:shadow-lg transition-all duration-300'
        >
          <div className='flex items-center space-x-3 mb-3'>
            <div className='p-2 rounded-lg bg-white/70 dark:bg-slate-800/70 text-blue-600 shadow-sm'>
              {getMetricIcon(metric.metric)}
            </div>
            <h3 className='text-lg font-semibold text-gray-800 dark:text-gray-200'>
              {metric.metric}
            </h3>
          </div>
          <div className='text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2'>
            {metric.value}
          </div>
          <p className='text-gray-600 dark:text-gray-400 text-sm'>
            {metric.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
