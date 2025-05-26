import { MdTableChart } from "react-icons/md";

export default function EmptyState() {
  return (
    <div className='bg-white rounded-2xl shadow-xl p-12 text-center'>
      <MdTableChart className='w-16 h-16 text-gray-400 mx-auto mb-4' />
      <h3 className='text-xl font-semibold text-gray-700 mb-2'>
        No Charts Generated
      </h3>
      <p className='text-gray-500'>
        The AI couldn&apos;t generate meaningful charts for this dataset. Try
        uploading a different file with more structured data.
      </p>
    </div>
  );
}
