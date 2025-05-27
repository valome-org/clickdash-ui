import { motion } from "framer-motion";
import { ChartConfig } from "../types/dashboard";
import InteractiveChartCard from "./InteractiveChartCard";

interface ChartsGridProps {
  charts: ChartConfig[];
}

export default function ChartsGrid({ charts }: ChartsGridProps) {
  return (
    <section className='py-8'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-8'
        >
          <h2 className='text-2xl font-bold text-gray-900 mb-2'>
            Analytics Dashboard
          </h2>
          <p className='text-gray-600'>
            Interactive data visualizations and insights
          </p>
        </motion.div>

        {/* Charts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`grid grid-cols-1 mx-auto gap-6`}
        >
          {charts.map((chart, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}
            >
              <InteractiveChartCard chart={chart} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='mt-8 text-center'
        >
          <div className='inline-flex items-center space-x-6 bg-white rounded-lg px-6 py-3 shadow-sm border border-gray-200'>
            <div className='text-center'>
              <div className='text-lg font-bold text-blue-600'>
                {charts.length}
              </div>
              <div className='text-xs text-gray-500'>Charts</div>
            </div>
            <div className='w-px h-6 bg-gray-300'></div>
            <div className='text-center'>
              <div className='text-lg font-bold text-green-600'>
                {new Set(charts.map((c) => c.chart_type)).size}
              </div>
              <div className='text-xs text-gray-500'>Types</div>
            </div>
            <div className='w-px h-6 bg-gray-300'></div>
            <div className='text-center'>
              <div className='text-lg font-bold text-purple-600'>Live</div>
              <div className='text-xs text-gray-500'>Data</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
