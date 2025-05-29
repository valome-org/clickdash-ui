import { Button } from "@/components/ui/button";
import { CarIcon, FileBarChart } from "lucide-react";
import Link from "next/link";

export function EmptyState() {
  return (
    <div className='flex flex-col items-center justify-center py-12 text-center'>
      <div className='w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-6'>
        <FileBarChart className='h-10 w-10 text-blue-600 dark:text-blue-400' />
      </div>
      <h3 className='text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2'>
        No charts available
      </h3>
      <p className='text-slate-500 dark:text-slate-400 max-w-md mb-6'>
        There are no visualizations for this dashboard. This could be due to
        insufficient data or an error during processing.
      </p>
      <Button asChild>
        <Link href='/upload'>
          <CarIcon className='mr-2 h-4 w-4' />
          Upload new data
        </Link>
      </Button>
    </div>
  );
}
