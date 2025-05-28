import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Card, CardContent } from "./card";

interface ErrorAlertProps {
  message: string | null;
}

export function ErrorAlert({ message }: ErrorAlertProps) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className='mb-8'
        >
          <Card className='border-red-200 bg-red-50/80 backdrop-blur-sm'>
            <CardContent className='p-4'>
              <p className='text-red-700 flex items-center'>
                <AlertCircle className='h-4 w-4 mr-2' />
                {message}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
