import { MdTrendingUp } from "react-icons/md";

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

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      {metrics.map((metric, index) => (
        <div key={index} className='bg-white rounded-2xl shadow-xl p-6'>
          <div className='flex items-center space-x-3 mb-2'>
            <MdTrendingUp className='w-6 h-6 text-blue-500' />
            <h3 className='text-lg font-semibold text-gray-800'>
              {metric.metric}
            </h3>
          </div>
          <div className='text-3xl font-bold text-blue-600 mb-2'>
            {metric.value}
          </div>
          <p className='text-gray-600 text-sm'>{metric.description}</p>
        </div>
      ))}
    </div>
  );
}
