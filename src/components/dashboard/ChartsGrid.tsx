import { ChartConfig } from "@/app/types/dashboard";
import {
  AreaChart,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
} from "@/components/charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  BarChart as BarChartIcon,
  Download,
  Filter,
  Info,
  LineChart as LineChartIcon,
  MoreHorizontal,
  PieChart as PieChartIcon,
  Sparkles,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useState } from "react";

interface ChartsGridProps {
  charts: ChartConfig[];
}

export function ChartsGrid({ charts }: ChartsGridProps) {
  const [expandedChart, setExpandedChart] = useState<string | null>(null);

  const toggleChartExpansion = (chartTitle: string) => {
    setExpandedChart(expandedChart === chartTitle ? null : chartTitle);
  };

  const renderChartByType = (chart: ChartConfig) => {
    switch (chart.chart_type.toLowerCase()) {
      case "bar":
        return <BarChart data={chart.data} />;
      case "line":
        return <LineChart data={chart.data} />;
      case "pie":
        return <PieChart data={chart.data} />;
      case "scatter":
        return <ScatterChart data={chart.data} />;
      case "area":
        return <AreaChart data={chart.data} />;
      case "doughnut":
        return <PieChart data={chart.data} variant='doughnut' />;
      case "radar":
        return <BarChart data={chart.data} variant='radar' />;
      case "heatmap":
        return <BarChart data={chart.data} variant='heatmap' />;
      default:
        return <BarChart data={chart.data} />;
    }
  };

  const getChartIcon = (chartType: string) => {
    switch (chartType.toLowerCase()) {
      case "bar":
        return <BarChartIcon className='h-4 w-4' />;
      case "line":
        return <LineChartIcon className='h-4 w-4' />;
      case "pie":
      case "doughnut":
        return <PieChartIcon className='h-4 w-4' />;
      default:
        return <BarChartIcon className='h-4 w-4' />;
    }
  };

  const getImportanceBadge = (importance: string) => {
    switch (importance?.toLowerCase()) {
      case "high":
        return <Badge variant='destructive'>High Importance</Badge>;
      case "medium":
        return <Badge variant='secondary'>Medium Importance</Badge>;
      case "low":
        return <Badge variant='outline'>Low Importance</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {charts.map((chart, index) => (
        <Card
          key={index}
          className={cn(
            "overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-xl transition-all duration-300",
            expandedChart === chart.title && "md:col-span-2 scale-[1.02]"
          )}
        >
          <CardHeader className='p-4 pb-0'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                {getChartIcon(chart.chart_type)}
                <CardTitle className='text-lg font-bold'>
                  {chart.title}
                </CardTitle>
              </div>
              <div className='flex items-center gap-2'>
                {chart.metadata?.importance &&
                  getImportanceBadge(chart.metadata.importance)}
                <Button
                  variant='ghost'
                  size='sm'
                  onClick={() => toggleChartExpansion(chart.title)}
                  className='p-1 h-8 w-8'
                >
                  {expandedChart === chart.title ? (
                    <ZoomOut className='h-4 w-4' />
                  ) : (
                    <ZoomIn className='h-4 w-4' />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' className='p-1 h-8 w-8'>
                      <MoreHorizontal className='h-4 w-4' />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align='end'>
                    <DropdownMenuLabel>Chart Options</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {chart.interactive_features?.includes("filter") && (
                      <DropdownMenuItem>
                        <Filter className='h-4 w-4 mr-2' /> Filter Data
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Download className='h-4 w-4 mr-2' /> Export Chart
                    </DropdownMenuItem>
                    {chart.interactive_features?.includes("drill_down") && (
                      <DropdownMenuItem>
                        <ZoomIn className='h-4 w-4 mr-2' /> Drill Down
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem>
                      <Info className='h-4 w-4 mr-2' /> Chart Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          <CardContent className='p-4'>
            <div
              className={cn(
                "chart-container",
                expandedChart === chart.title ? "h-[400px]" : "h-[250px]"
              )}
            >
              {renderChartByType(chart)}
            </div>
          </CardContent>
          {expandedChart === chart.title && (
            <Tabs defaultValue='insights' className='px-4 pb-4'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='insights'>Insights</TabsTrigger>
                <TabsTrigger value='metadata'>Metadata</TabsTrigger>
                <TabsTrigger value='actions'>Recommended Actions</TabsTrigger>
              </TabsList>
              <TabsContent value='insights' className='mt-2'>
                <Card>
                  <CardContent className='p-4'>
                    <p className='text-sm'>{chart.insights}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='metadata' className='mt-2'>
                <Card>
                  <CardContent className='p-4 space-y-2'>
                    <div className='grid grid-cols-2 gap-2'>
                      <div>
                        <p className='text-xs text-muted-foreground'>
                          Chart Type
                        </p>
                        <p className='text-sm font-medium capitalize'>
                          {chart.chart_type}
                        </p>
                      </div>
                      <div>
                        <p className='text-xs text-muted-foreground'>
                          Data Source
                        </p>
                        <p className='text-sm font-medium'>
                          {chart.data_config?.source_columns?.join(", ") ||
                            `${chart.x_axis}, ${chart.y_axis}`}
                        </p>
                      </div>
                      {chart.metadata?.relevant_business_kpis && (
                        <div className='col-span-2'>
                          <p className='text-xs text-muted-foreground'>
                            Related KPIs
                          </p>
                          <div className='flex flex-wrap gap-1 mt-1'>
                            {chart.metadata.relevant_business_kpis.map(
                              (kpi, i) => (
                                <Badge
                                  key={i}
                                  variant='outline'
                                  className='text-xs'
                                >
                                  {kpi}
                                </Badge>
                              )
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value='actions' className='mt-2'>
                <Card>
                  <CardContent className='p-4'>
                    {chart.metadata?.recommended_actions ? (
                      <ul className='text-sm space-y-2'>
                        {chart.metadata.recommended_actions.map((action, i) => (
                          <li key={i} className='flex items-start gap-2'>
                            <Sparkles className='h-4 w-4 text-blue-500 mt-0.5' />
                            <span>{action}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className='text-sm text-muted-foreground'>
                        No recommended actions available
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
          {!expandedChart && (
            <CardFooter className='p-4 pt-0'>
              <Button
                variant='link'
                size='sm'
                className='p-0 h-auto'
                onClick={() => toggleChartExpansion(chart.title)}
              >
                View details
              </Button>
            </CardFooter>
          )}
        </Card>
      ))}
    </div>
  );
}
