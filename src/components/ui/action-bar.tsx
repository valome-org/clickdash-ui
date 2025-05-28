import { motion } from "framer-motion";
import React from "react";
import { Card, CardContent } from "./card";

interface ActionBarProps {
  children: React.ReactNode;
  className?: string;
}

export function ActionBar({ children, className = "" }: ActionBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1 }}
      className={`mb-12 ${className}`}
    >
      <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl'>
        <CardContent className='p-6'>{children}</CardContent>
      </Card>
    </motion.div>
  );
}
