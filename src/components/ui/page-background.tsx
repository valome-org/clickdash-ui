import React from "react";
import { GridPattern } from "./grid-pattern";
import { Spotlight } from "./spotlight";

interface PageBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export function PageBackground({
  children,
  className = "",
}: PageBackgroundProps) {
  return (
    <div
      className={`min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-blue-950 dark:to-indigo-950 ${className}`}
    >
      {/* Background Effects */}
      <GridPattern className='opacity-20' />
      <Spotlight className='top-40 left-0 md:left-60 md:-top-20' fill='blue' />

      {/* Floating Orbs */}
      <div className='absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse'></div>
      <div className='absolute bottom-20 right-20 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000'></div>

      {/* Content */}
      <div className='relative z-10 container mx-auto px-4 py-8'>
        {children}
      </div>
    </div>
  );
}
