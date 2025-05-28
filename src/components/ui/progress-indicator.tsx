import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface ProgressIndicatorProps {
  progress: number;
  message?: string;
  isVisible: boolean;
}

export function ProgressIndicator({
  progress,
  message = "Our AI is analyzing your data and creating your dashboard...",
  isVisible,
}: ProgressIndicatorProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className='space-y-2'
        >
          <div className='flex justify-between text-sm'>
            <span className='text-blue-700 dark:text-blue-400 font-medium flex items-center'>
              <Loader2 className='mr-2 h-3 w-3 animate-spin' />
              Processing...
            </span>
            <span className='font-medium text-blue-800 dark:text-blue-300'>
              {progress}%
            </span>
          </div>
          <div className='w-full bg-blue-100 dark:bg-blue-900 rounded-full h-2.5 overflow-hidden'>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className='bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full'
              transition={{ duration: 0.3 }}
            ></motion.div>
          </div>
          <div className='text-sm text-blue-700 dark:text-blue-400 text-center italic'>
            {message}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
