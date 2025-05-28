import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
}

export function PageHeader({ badge, title, description }: PageHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className='text-center mb-12'
    >
      {badge && (
        <div className='inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-2 mb-6'>
          <Sparkles className='h-4 w-4 text-blue-500' />
          <span className='text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            {badge}
          </span>
        </div>
      )}

      <h1 className='text-4xl md:text-5xl font-bold mb-6'>
        <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>
          {title}
        </span>
      </h1>

      {description && (
        <p className='text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed'>
          {description}
        </p>
      )}
    </motion.div>
  );
}
