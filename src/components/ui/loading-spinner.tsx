import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  title?: string;
  subtitle?: string;
}

export function LoadingSpinner({
  title = "Loading ClickDash",
  subtitle = "Preparing your analytics workspace...",
}: LoadingSpinnerProps) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className='flex flex-col items-center space-y-6'
      >
        <div className='relative'>
          <div className='w-20 h-20 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600'></div>
          <div className='absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full animate-ping'></div>
        </div>
        <div className='text-center space-y-2'>
          <h3 className='text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            {title}
          </h3>
          <p className='text-muted-foreground'>{subtitle}</p>
        </div>
      </motion.div>
    </div>
  );
}
