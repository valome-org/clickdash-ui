import {
  Area,
  Bar,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  Pie,
  AreaChart as RechartsAreaChart,
  BarChart as RechartsBarChart,
  LineChart as RechartsLineChart,
  PieChart as RechartsPieChart,
  ScatterChart as RechartsScatterChart,
  ResponsiveContainer,
  Scatter,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
      borderColor?: string;
      borderWidth?: number;
    }>;
  };
  variant?: string;
}

// Transform data for Recharts format
const transformData = (chartData: ChartProps["data"]) => {
  if (!chartData?.labels || !chartData?.datasets) {
    return [];
  }

  return (chartData.labels || []).map((label, i) => {
    const dataPoint: Record<string, string | number> = {
      name: String(label),
    };

    // Add dataset values
    (chartData.datasets || []).forEach((dataset, datasetIndex) => {
      dataPoint[dataset.label || `Dataset ${datasetIndex}`] =
        typeof dataset.data?.[i] === "number" ? dataset.data[i] : 0;
    });

    return dataPoint;
  });
};

export function BarChart({ data }: ChartProps) {
  const transformedData = transformData(data);
  const dataKeys = data.datasets.map((dataset) => dataset.label || "Value");

  return (
    <div className='h-full w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <RechartsBarChart
          data={transformedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Bar
              key={index}
              dataKey={key}
              fill={
                typeof data.datasets[index].backgroundColor === "string"
                  ? data.datasets[index].backgroundColor
                  : Array.isArray(data.datasets[index].backgroundColor)
                  ? data.datasets[index].backgroundColor[0]
                  : `#${Math.floor(Math.random() * 16777215).toString(16)}`
              }
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function LineChart({ data }: ChartProps) {
  const transformedData = transformData(data);
  const dataKeys = data.datasets.map((dataset) => dataset.label || "Value");

  return (
    <div className='h-full w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <RechartsLineChart
          data={transformedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Line
              key={index}
              type='monotone'
              dataKey={key}
              stroke={
                data.datasets[index].borderColor ||
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              }
              activeDot={{ r: 8 }}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function PieChart({ data, variant }: ChartProps) {
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  const pieData = data.labels.map((label, index) => ({
    name: label,
    value: data.datasets[0].data[index] || 0,
  }));

  return (
    <div className='h-full w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <RechartsPieChart>
          <Pie
            data={pieData}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={80}
            innerRadius={variant === "doughnut" ? 40 : 0}
            fill='#8884d8'
            dataKey='value'
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  Array.isArray(data.datasets[0].backgroundColor)
                    ? data.datasets[0].backgroundColor[
                        index % data.datasets[0].backgroundColor.length
                      ]
                    : COLORS[index % COLORS.length]
                }
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ScatterChart({ data }: ChartProps) {
  const transformedData = transformData(data);
  const dataKeys = data.datasets.map((dataset) => dataset.label || "Value");

  return (
    <div className='h-full w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <RechartsScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid />
          <XAxis dataKey='name' type='category' />
          <YAxis dataKey={dataKeys[0]} type='number' />
          <Tooltip cursor={{ strokeDasharray: "3 3" }} />
          <Legend />
          <Scatter
            name={dataKeys[0]}
            data={transformedData}
            fill={
              typeof data.datasets[0].backgroundColor === "string"
                ? data.datasets[0].backgroundColor
                : "#8884d8"
            }
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AreaChart({ data }: ChartProps) {
  const transformedData = transformData(data);
  const dataKeys = data.datasets.map((dataset) => dataset.label || "Value");

  return (
    <div className='h-full w-full'>
      <ResponsiveContainer width='100%' height='100%'>
        <RechartsAreaChart
          data={transformedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='name' />
          <YAxis />
          <Tooltip />
          <Legend />
          {dataKeys.map((key, index) => (
            <Area
              key={index}
              type='monotone'
              dataKey={key}
              stroke={
                data.datasets[index].borderColor ||
                `#${Math.floor(Math.random() * 16777215).toString(16)}`
              }
              fill={
                typeof data.datasets[index].backgroundColor === "string"
                  ? data.datasets[index].backgroundColor
                  : `rgba(136, 132, 216, 0.6)`
              }
            />
          ))}
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}
