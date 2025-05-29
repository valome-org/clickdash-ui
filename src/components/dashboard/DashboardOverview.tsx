import { DashboardConfig } from "@/app/types/dashboard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  PieChart,
  RefreshCw,
  ScrollText,
  TimerReset,
} from "lucide-react";

interface DashboardOverviewProps {
  dashboard: DashboardConfig;
}

export function DashboardOverview({ dashboard }: DashboardOverviewProps) {
  const chartTypeCounts = dashboard.charts.reduce(
    (acc: Record<string, number>, chart) => {
      const type = chart.chart_type.toLowerCase();
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    {}
  );

  // Helper to get the proper icon for refresh frequency
  const getRefreshIcon = (frequency?: string) => {
    switch (frequency?.toLowerCase()) {
      case "daily":
        return <Calendar className='h-4 w-4 text-green-500' />;
      case "weekly":
        return <RefreshCw className='h-4 w-4 text-blue-500' />;
      case "monthly":
        return <TimerReset className='h-4 w-4 text-purple-500' />;
      default:
        return <RefreshCw className='h-4 w-4 text-gray-500' />;
    }
  };

  // Helper to get the proper badge for data quality
  const getQualityBadge = (quality?: string) => {
    switch (quality?.toLowerCase()) {
      case "high":
        return <Badge variant='default'>High Quality</Badge>;
      case "medium":
        return <Badge variant='secondary'>Medium Quality</Badge>;
      case "low":
        return <Badge variant='destructive'>Low Quality</Badge>;
      default:
        return <Badge variant='outline'>Unknown Quality</Badge>;
    }
  };

  return (
    <div className='space-y-6'>
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
        <div className='p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800'>
          <div className='flex items-center gap-2 mb-2'>
            <ScrollText className='h-5 w-5 text-blue-600 dark:text-blue-400' />
            <h3 className='font-medium'>Category</h3>
          </div>
          <p className='text-sm text-blue-700 dark:text-blue-300 capitalize'>
            {dashboard.category || "General"}
          </p>
        </div>

        <div className='p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800'>
          <div className='flex items-center gap-2 mb-2'>
            <BarChart3 className='h-5 w-5 text-purple-600 dark:text-purple-400' />
            <h3 className='font-medium'>Charts</h3>
          </div>
          <p className='text-sm text-purple-700 dark:text-purple-300'>
            {dashboard.charts.length} visualizations
          </p>
        </div>

        <div className='p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800'>
          <div className='flex items-center gap-2 mb-2'>
            <RefreshCw className='h-5 w-5 text-green-600 dark:text-green-400' />
            <h3 className='font-medium'>Refresh</h3>
          </div>
          <div className='flex items-center gap-1.5'>
            {getRefreshIcon(dashboard.metadata?.recommended_refresh_frequency)}
            <p className='text-sm text-green-700 dark:text-green-300 capitalize'>
              {dashboard.metadata?.recommended_refresh_frequency || "As needed"}
            </p>
          </div>
        </div>

        <div className='p-4 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800'>
          <div className='flex items-center gap-2 mb-2'>
            <CheckCircle2 className='h-5 w-5 text-amber-600 dark:text-amber-400' />
            <h3 className='font-medium'>Data Quality</h3>
          </div>
          <div>{getQualityBadge(dashboard.metadata?.data_quality_score)}</div>
        </div>
      </div>

      {/* Additional Dashboard Metadata */}
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='chart-types'>
          <AccordionTrigger className='text-base'>
            Chart Types Used
          </AccordionTrigger>
          <AccordionContent>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 pt-2'>
              {Object.entries(chartTypeCounts).map(([type, count]) => (
                <div
                  key={type}
                  className='flex items-center gap-2 p-2 rounded-md bg-slate-50 dark:bg-slate-800'
                >
                  {type === "bar" ? (
                    <BarChart3 className='h-4 w-4 text-blue-500' />
                  ) : type === "pie" || type === "doughnut" ? (
                    <PieChart className='h-4 w-4 text-green-500' />
                  ) : (
                    <BarChart3 className='h-4 w-4 text-purple-500' />
                  )}
                  <span className='text-sm capitalize'>{type}</span>
                  <Badge variant='outline' className='ml-auto'>
                    {count}
                  </Badge>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {dashboard.metadata?.key_factors && (
          <AccordionItem value='key-factors'>
            <AccordionTrigger className='text-base'>
              Key Factors
            </AccordionTrigger>
            <AccordionContent>
              <div className='flex flex-wrap gap-2 pt-2'>
                {dashboard.metadata.key_factors.map((factor, index) => (
                  <Badge key={index} variant='secondary'>
                    {factor}
                  </Badge>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        )}

        {dashboard.metadata?.potential_use_cases && (
          <AccordionItem value='use-cases'>
            <AccordionTrigger className='text-base'>
              Potential Use Cases
            </AccordionTrigger>
            <AccordionContent>
              <ul className='list-disc pl-5 pt-2 space-y-1'>
                {dashboard.metadata.potential_use_cases.map(
                  (useCase, index) => (
                    <li key={index} className='text-sm'>
                      {useCase}
                    </li>
                  )
                )}
              </ul>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
}
