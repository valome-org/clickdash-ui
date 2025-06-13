import { Sparkles } from "lucide-react";

interface InsightsSectionProps {
  insights: string;
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  // Split insights into paragraphs if it contains multiple sentences
  const paragraphs = insights
    .split(/\.\s+/)
    .filter(Boolean)
    .map((p) => p.trim() + (p.endsWith(".") ? "" : "."));

  return (
    <div className='space-y-4'>
      {paragraphs.length > 1 ? (
        paragraphs.map((paragraph, index) => (
          <div key={index} className='flex items-start gap-3'>
            <div className='mt-1'>
              <Sparkles className='h-5 w-5 text-blue-500' />
            </div>
            <p className='text-slate-700 dark:text-slate-300'>{paragraph}</p>
          </div>
        ))
      ) : (
        <div className='flex items-start gap-3'>
          <div className='mt-1'>
            <Sparkles className='h-5 w-5 text-blue-500' />
          </div>
          <p className='text-slate-700 dark:text-slate-300'>{insights}</p>
        </div>
      )}
    </div>
  );
}
