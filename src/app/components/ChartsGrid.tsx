import ChartCard from "./ChartCard";

interface ChartConfig {
  chart_type: string;
  title: string;
  x_axis: string;
  y_axis: string;
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string | string[];
      borderWidth?: number;
      tension?: number;
    }>;
  };
  insights?: string;
  color_scheme?: string;
}

interface ChartsGridProps {
  charts: ChartConfig[];
}

export default function ChartsGrid({ charts }: ChartsGridProps) {
  return (
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {charts.map((chart, index) => (
        <ChartCard key={index} chart={chart} index={index} />
      ))}
    </div>
  );
}
