import { MdInsights } from "react-icons/md";

interface InsightsSectionProps {
  insights: string;
}

export default function InsightsSection({ insights }: InsightsSectionProps) {
  if (!insights) return null;

  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
      <div className='flex items-center space-x-3 mb-4'>
        <MdInsights className='w-6 h-6 text-green-500' />
        <h2 className='text-xl font-semibold text-gray-800'>
          AI-Generated Insights
        </h2>
      </div>
      <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
        <p className='text-gray-700 leading-relaxed'>{insights}</p>
      </div>
    </div>
  );
}
