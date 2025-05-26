import { MdError } from "react-icons/md";

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='bg-white rounded-2xl shadow-xl p-8 text-center max-w-md'>
        <MdError className='w-16 h-16 text-red-500 mx-auto mb-4' />
        <h2 className='text-xl font-semibold text-gray-700 mb-4'>
          Dashboard Not Found
        </h2>
        <p className='text-red-600 mb-6'>{error}</p>
        <button
          onClick={() => (window.location.href = "/")}
          className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}
