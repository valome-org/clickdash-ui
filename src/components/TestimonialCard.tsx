import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  delay: number;
}

export const TestimonialCard = ({
  name,
  role,
  content,
  rating,
  avatar,
  delay,
}: TestimonialCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 50, rotate: -5 }}
    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
    transition={{ duration: 0.6, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -10, rotate: 2, scale: 1.02 }}
    className='bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-2xl transition-all'
  >
    <div className='flex mb-6'>
      {[...Array(rating)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: delay + i * 0.1 }}
        >
          <Star className='w-5 h-5 fill-yellow-400 text-yellow-400' />
        </motion.div>
      ))}
    </div>
    <p className='text-gray-700 mb-6 text-lg italic leading-relaxed'>
      &ldquo;{content}&rdquo;
    </p>
    <div className='flex items-center gap-4'>
      <div
        className={`w-12 h-12 rounded-full ${avatar} flex items-center justify-center text-white font-bold text-lg`}
      >
        {name.charAt(0)}
      </div>
      <div>
        <p className='text-gray-900 font-bold text-lg'>{name}</p>
        <p className='text-gray-600'>{role}</p>
      </div>
    </div>
  </motion.div>
);

export default TestimonialCard;
