import {
  MdAnalytics,
  MdBarChart,
  MdDonutLarge,
  MdScatterPlot,
  MdShowChart,
} from "react-icons/md";

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

interface ChartCardProps {
  chart: ChartConfig;
  index: number;
}

export default function ChartCard({ chart, index }: ChartCardProps) {
  const getChartIcon = (chartType: string) => {
    switch (chartType) {
      case "bar":
        return <MdBarChart className='w-5 h-5' />;
      case "line":
        return <MdShowChart className='w-5 h-5' />;
      case "pie":
        return <MdDonutLarge className='w-5 h-5' />;
      case "scatter":
        return <MdScatterPlot className='w-5 h-5' />;
      default:
        return <MdAnalytics className='w-5 h-5' />;
    }
  };

  const getColorSchemeClass = (scheme: string) => {
    switch (scheme) {
      case "success":
        return "text-green-600 bg-green-50 border-green-200";
      case "warning":
        return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "info":
        return "text-cyan-600 bg-cyan-50 border-cyan-200";
      case "secondary":
        return "text-gray-600 bg-gray-50 border-gray-200";
      default:
        return "text-blue-600 bg-blue-50 border-blue-200";
    }
  };

  const renderBarChart = () => (
    <div className='space-y-3'>
      {chart.data.labels.map((label, i) => {
        const value = chart.data.datasets[0].data[i];
        const maxValue = Math.max(...chart.data.datasets[0].data);
        const percentage = maxValue > 0 ? (value / maxValue) * 100 : 0;

        return (
          <div key={i} className='space-y-1'>
            <div className='flex justify-between text-sm'>
              <span className='text-gray-600 font-medium truncate max-w-[60%]'>
                {label}
              </span>
              <span className='text-gray-900 font-semibold'>
                {typeof value === "number" ? value.toLocaleString() : value}
              </span>
            </div>
            <div className='bg-gray-200 rounded-full h-3 relative overflow-hidden'>
              <div
                className='bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500'
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderLineChart = () => (
    <div className='bg-gray-50 rounded-lg p-6'>
      <div className='text-center mb-4'>
        <MdShowChart className='w-12 h-12 text-green-500 mx-auto mb-2' />
        <p className='text-gray-700 font-medium'>Line Chart Visualization</p>
      </div>
      <div className='grid grid-cols-3 gap-4 text-center'>
        <div className='bg-white rounded-lg p-3'>
          <p className='text-sm text-gray-500'>Data Points</p>
          <p className='text-lg font-semibold text-gray-800'>
            {chart.data.labels.length}
          </p>
        </div>
        <div className='bg-white rounded-lg p-3'>
          <p className='text-sm text-gray-500'>Min Value</p>
          <p className='text-lg font-semibold text-gray-800'>
            {Math.min(...chart.data.datasets[0].data).toLocaleString()}
          </p>
        </div>
        <div className='bg-white rounded-lg p-3'>
          <p className='text-sm text-gray-500'>Max Value</p>
          <p className='text-lg font-semibold text-gray-800'>
            {Math.max(...chart.data.datasets[0].data).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );

  const renderPieChart = () => (
    <div className='space-y-3'>
      {chart.data.labels.map((label, i) => {
        const value = chart.data.datasets[0].data[i];
        const total = chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
        const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
        const bgColors = chart.data.datasets[0].backgroundColor as string[];
        const color = bgColors
          ? bgColors[i % bgColors.length]
          : "rgba(59, 130, 246, 0.8)";

        return (
          <div key={i} className='flex items-center space-x-3'>
            <div
              className='w-4 h-4 rounded-full'
              style={{ backgroundColor: color }}
            />
            <div className='flex-1 flex justify-between'>
              <span className='text-gray-600 truncate max-w-[60%]'>
                {label}
              </span>
              <span className='text-gray-900 font-semibold'>{percentage}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );

  const renderScatterChart = () => (
    <div className='bg-gray-50 rounded-lg p-6 text-center'>
      <MdScatterPlot className='w-12 h-12 text-purple-500 mx-auto mb-2' />
      <p className='text-gray-700 font-medium'>Scatter Plot</p>
      <p className='text-sm text-gray-500 mt-2'>
        Correlation between {chart.x_axis} and {chart.y_axis}
      </p>
    </div>
  );

  const renderChart = () => {
    switch (chart.chart_type) {
      case "bar":
        return renderBarChart();
      case "line":
        return renderLineChart();
      case "pie":
        return renderPieChart();
      case "scatter":
        return renderScatterChart();
      default:
        return renderBarChart();
    }
  };

  return (
    <div className='bg-white rounded-2xl shadow-xl p-6'>
      <div className='flex items-center space-x-3 mb-4'>
        <div
          className={`p-2 rounded-lg ${getColorSchemeClass(
            chart.color_scheme || "primary"
          )}`}
        >
          {getChartIcon(chart.chart_type)}
        </div>
        <div className='flex-1'>
          <h3 className='text-lg font-semibold text-gray-800'>{chart.title}</h3>
          <p className='text-sm text-gray-500'>
            {chart.chart_type.toUpperCase()} Chart
          </p>
        </div>
      </div>

      <div className='space-y-4'>{renderChart()}</div>

      {chart.insights && (
        <div className='mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg'>
          <p className='text-blue-800 text-sm font-medium'>
            💡 {chart.insights}
          </p>
        </div>
      )}

      <div className='mt-4 pt-4 border-t border-gray-200'>
        <div className='flex justify-between text-sm text-gray-500'>
          <span>
            {chart.x_axis} vs {chart.y_axis}
          </span>
          <span className='flex items-center space-x-1'>
            {getChartIcon(chart.chart_type)}
            <span>{chart.chart_type.toUpperCase()}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
