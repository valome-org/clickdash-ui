import { Check } from "lucide-react";

interface StepItem {
  title: string;
}

interface StepsProps {
  title?: string;
  items: StepItem[];
}

export function Steps({ title = "What happens next?", items }: StepsProps) {
  return (
    <div className='w-full pt-4'>
      <h3 className='font-semibold text-blue-900 dark:text-blue-300 mb-4 flex items-center'>
        <Check className='text-green-600 dark:text-green-400 mr-2 h-5 w-5' />
        {title}
      </h3>
      <div className='space-y-4'>
        {items.map((item, index) => (
          <div key={index} className='flex items-start gap-4'>
            <div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md'>
              {index + 1}
            </div>
            <div className='flex-1 p-3 bg-white/60 dark:bg-slate-800/60 rounded-lg border border-blue-100 dark:border-blue-800 shadow-sm'>
              {item.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
