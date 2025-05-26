import { MdTableChart } from "react-icons/md";

interface DashboardHeaderProps {
  title: string;
  summary?: string;
}

export default function DashboardHeader({
  title,
  summary,
}: DashboardHeaderProps) {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-3'>
          <MdTableChart className='w-8 h-8 text-blue-500' />
          <div>
            <h1 className='text-3xl font-bold text-gray-900'>{title}</h1>
            {summary && <p className='text-gray-600 mt-1'>{summary}</p>}
          </div>
        </div>
        <button
          onClick={() => (window.location.href = "/")}
          className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors'
        >
          Upload New File
        </button>
      </div>
    </div>
  );
}
