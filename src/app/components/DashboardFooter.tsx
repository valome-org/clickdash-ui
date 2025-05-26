import { MdAnalytics, MdInsights, MdSpeed } from "react-icons/md";

export default function DashboardFooter() {
  return (
    <div className='mt-12 text-center'>
      <div className='flex items-center justify-center space-x-6 text-sm text-gray-500'>
        <div className='flex items-center space-x-2'>
          <MdSpeed className='w-4 h-4' />
          <span>AI-Powered</span>
        </div>
        <div className='flex items-center space-x-2'>
          <MdAnalytics className='w-4 h-4' />
          <span>Smart Analytics</span>
        </div>
        <div className='flex items-center space-x-2'>
          <MdInsights className='w-4 h-4' />
          <span>Actionable Insights</span>
        </div>
      </div>
    </div>
  );
}
