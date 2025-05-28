import { Card } from "@/components/ui/card";
import { BarChart, BrainCircuit, Sparkles, Zap } from "lucide-react";

export default function DashboardFooter() {
  return (
    <div className='mt-12 mb-8'>
      <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-lg'>
        <div className='px-6 py-5'>
          <div className='flex flex-col md:flex-row items-center justify-between'>
            <div className='flex items-center space-x-3 mb-4 md:mb-0'>
              <div className='bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-md'>
                <Sparkles className='w-5 h-5 text-white' />
              </div>
              <div className='text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                ClickDash
              </div>
            </div>

            <div className='flex flex-wrap items-center justify-center md:justify-end gap-6 text-sm text-gray-500'>
              <div className='flex items-center space-x-2'>
                <Zap className='w-4 h-4 text-blue-500' />
                <span>AI-Powered</span>
              </div>
              <div className='flex items-center space-x-2'>
                <BarChart className='w-4 h-4 text-purple-500' />
                <span>Smart Analytics</span>
              </div>
              <div className='flex items-center space-x-2'>
                <BrainCircuit className='w-4 h-4 text-indigo-500' />
                <span>Actionable Insights</span>
              </div>
            </div>
          </div>

          <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 text-center text-xs text-gray-400'>
            Generated on {new Date().toLocaleDateString()} • Powered by
            ClickDash Analytics Engine
          </div>
        </div>
      </Card>
    </div>
  );
}
