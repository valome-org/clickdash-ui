import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingState() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
      <div className='text-center'>
        <AiOutlineLoading3Quarters className='w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin' />
        <h2 className='text-xl font-semibold text-gray-700'>
          Generating AI Dashboard...
        </h2>
        <p className='text-gray-500 mt-2'>
          Analyzing your data with advanced AI
        </p>
      </div>
    </div>
  );
}
