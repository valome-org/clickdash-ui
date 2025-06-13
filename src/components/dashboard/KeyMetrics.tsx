import { KeyMetric } from "@/app/types/dashboard";

interface KeyMetricsProps {
  metrics: KeyMetric[];
}

export function KeyMetrics({ metrics }: KeyMetricsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
      {metrics.map((metric, index) => (
        <div
          key={index}
          className='p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/50 dark:to-blue-900/30 border border-blue-200/50 dark:border-blue-800/50 flex flex-col items-center text-center'
        >
          <div className='text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2'>
            {metric.value}
          </div>
          <div className='font-medium text-blue-900 dark:text-blue-300 mb-1'>
            {metric.metric}
          </div>
          {metric.description && (
            <div className='text-sm text-blue-700/70 dark:text-blue-500/70'>
              {metric.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
