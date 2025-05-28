import { motion } from "framer-motion";
import { BarChart, BarChart3, ChartPie, Layers, LineChart } from "lucide-react";
import { ChartConfig } from "../types/dashboard";
import InteractiveChartCard from "./InteractiveChartCard";

interface ChartsGridProps {
  charts: ChartConfig[];
}

export default function ChartsGrid({ charts }: ChartsGridProps) {
  // Get all unique chart types
  const chartTypes = Array.from(new Set(charts.map((c) => c.chart_type)));

  // Generate chart type stats
  const chartTypeStats = chartTypes.map((type) => {
    const count = charts.filter((c) => c.chart_type === type).length;
    const percentage = Math.round((count / charts.length) * 100);

    return { type, count, percentage };
  });

  // Get icon for chart type
  const getChartIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "bar":
        return <BarChart className='h-4 w-4' />;
      case "pie":
        return <ChartPie className='h-4 w-4' />;
      case "line":
        return <LineChart className='h-4 w-4' />;
      default:
        return <BarChart3 className='h-4 w-4' />;
    }
  };

  return (
    <div>
      {/* Charts Grid */}
      <div className='grid grid-cols-1 gap-6 mb-8'>
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
      </div>

      {/* Chart Types Summary */}
      <div className='mb-4'>
        <div className='bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-xl border border-white/20 shadow-lg p-4'>
          <div className='flex items-center justify-between mb-4'>
            <div className='flex items-center'>
              <div className='p-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 mr-3'>
                <Layers className='h-5 w-5' />
              </div>
              <h3 className='text-sm font-medium text-gray-700 dark:text-gray-300'>
                Chart Distribution
              </h3>
            </div>
            <div className='text-xs text-gray-500 dark:text-gray-400 bg-blue-50/50 dark:bg-blue-900/30 px-3 py-1 rounded-full'>
              {charts.length} total visualizations
            </div>
          </div>

          <div className='flex flex-wrap gap-2'>
            {chartTypeStats.map((stat, index) => (
              <div
                key={index}
                className='bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 backdrop-blur-sm border border-blue-100/30 dark:border-blue-800/30 rounded-full px-3 py-1.5 text-xs flex items-center'
              >
                <span className='text-blue-600 dark:text-blue-400 mr-1.5'>
                  {getChartIcon(stat.type)}
                </span>
                <span className='font-medium text-gray-700 dark:text-gray-300 capitalize mr-1.5'>
                  {stat.type}
                </span>
                <span className='text-gray-500 dark:text-gray-400'>
                  {stat.count} ({stat.percentage}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
