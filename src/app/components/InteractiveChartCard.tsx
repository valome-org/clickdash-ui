"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Download,
  Eye,
  EyeOff,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  Table,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartConfig } from "../types/dashboard";

interface TransformedDataPoint {
  name: string;
  value: number;
  [key: string]: string | number | undefined;
}

interface InteractiveChartCardProps {
  chart: ChartConfig;
  index: number;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number | string;
    color: string;
    payload?: TransformedDataPoint;
  }>;
  label?: string;
}

const COLORS = [
  "#3B82F6",
  "#EF4444",
  "#10B981",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#06B6D4",
  "#84CC16",
  "#F97316",
  "#6366F1",
];

const CHART_TYPES = [
  { type: "bar", icon: BarChart3, label: "Bar Chart" },
  { type: "line", icon: LineChartIcon, label: "Line Chart" },
  { type: "pie", icon: PieChartIcon, label: "Pie Chart" },
];

export default function InteractiveChartCard({
  chart,
  index,
}: InteractiveChartCardProps) {
  const [showTable, setShowTable] = useState(false);

  // Smart chart type recommendation based on data
  const getRecommendedChartType = (
    originalType: string,
    data: ChartConfig["data"]
  ) => {
    if (!data?.datasets?.[0]?.data) return "bar";

    const dataLength = data.datasets[0].data.length;
    const isNumericData = data.datasets[0].data.every(
      (val: number | undefined) => typeof val === "number"
    );

    // If pie chart but too many categories, recommend bar chart
    if (originalType === "pie" && dataLength > 8) {
      return "bar";
    }

    // If line chart but non-sequential data, recommend bar chart
    if (originalType === "line" && !isNumericData) {
      return "bar";
    }

    // Only allow supported chart types
    if (["bar", "line", "pie"].includes(originalType)) {
      return originalType;
    }

    return "bar"; // Default fallback
  };

  const recommendedChartType = getRecommendedChartType(
    chart.chart_type,
    chart.data
  );
  const [currentChartType, setCurrentChartType] =
    useState(recommendedChartType);

  // Transform data for Recharts
  const transformedData = (() => {
    try {
      if (!chart.data?.labels || !chart.data?.datasets) {
        return [];
      }

      return (chart.data.labels || []).map((label, i) => {
        const baseData: TransformedDataPoint = {
          name: String(label), // Ensure name is always a string
          value: chart.data?.datasets?.[0]?.data?.[i] || 0,
        };

        // Add dataset values
        (chart.data?.datasets || []).forEach((dataset, datasetIndex) => {
          const value = dataset.data?.[i];
          baseData[`dataset_${datasetIndex}`] =
            typeof value === "number" ? value : 0;
          baseData[`label_${datasetIndex}`] =
            dataset.label || `Dataset ${datasetIndex}`;
        });

        return baseData;
      });
    } catch (error) {
      console.error("Data transformation error:", error);
      return [];
    }
  })();

  const getChartIcon = (chartType: string) => {
    const chartConfig = CHART_TYPES.find((c) => c.type === chartType);
    const IconComponent = chartConfig?.icon || BarChart3;
    return <IconComponent className='w-5 h-5' />;
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white p-3 rounded-lg shadow-lg border border-gray-200 max-w-xs'
        >
          {label && (
            <p className='font-semibold text-gray-800 text-sm truncate'>
              {String(label)}
            </p>
          )}
          {payload.map((entry, index) => {
            const value = entry.value;
            const displayValue =
              typeof value === "number"
                ? value.toLocaleString()
                : typeof value === "string"
                ? value
                : String(value);

            return (
              <p
                key={index}
                style={{ color: entry.color }}
                className='text-sm truncate'
              >
                {`${entry.name}: ${displayValue}`}
              </p>
            );
          })}
        </motion.div>
      );
    }
    return null;
  };

  const renderChart = () => {
    // Add error handling for invalid data
    if (
      !chart.data ||
      !chart.data.datasets ||
      chart.data.datasets.length === 0
    ) {
      return (
        <div className='flex items-center justify-center h-full text-gray-500'>
          <div className='text-center'>
            <BarChart3 className='w-12 h-12 mx-auto mb-2 text-gray-400' />
            <p className='text-sm'>No data available</p>
          </div>
        </div>
      );
    }

    // Format numbers properly on the Y-axis
    const formatYAxisTick = (value: number) => {
      return value.toLocaleString();
    };

    const chartProps = {
      data: transformedData,
      margin: { top: 20, right: 30, left: 40, bottom: 5 },
    };

    try {
      switch (currentChartType) {
        case "bar":
          return (
            <BarChart {...chartProps}>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor='end'
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={formatYAxisTick}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {(chart.data?.datasets || []).map((dataset, i) => (
                <Bar
                  key={i}
                  dataKey={`dataset_${i}`}
                  name={dataset.label || `Dataset ${i}`}
                  fill={COLORS[i % COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          );

        case "line":
          return (
            <LineChart {...chartProps}>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis dataKey='name' tick={{ fontSize: 12 }} />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={formatYAxisTick}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {(chart.data?.datasets || []).map((dataset, i) => (
                <Line
                  key={i}
                  type='monotone'
                  dataKey={`dataset_${i}`}
                  name={dataset.label || `Dataset ${i}`}
                  stroke={COLORS[i % COLORS.length]}
                  strokeWidth={3}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          );

        case "pie":
          return (
            <PieChart>
              <Pie
                data={transformedData}
                cx='50%'
                cy='50%'
                labelLine={false}
                label={({ name, percent }) => {
                  const displayName =
                    typeof name === "string" ? name : String(name);
                  return `${displayName} ${(percent * 100).toFixed(0)}%`;
                }}
                outerRadius={80}
                fill='#8884d8'
                dataKey='value'
              >
                {transformedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          );

        default:
          return (
            <BarChart {...chartProps}>
              <CartesianGrid strokeDasharray='3 3' stroke='#f0f0f0' />
              <XAxis
                dataKey='name'
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor='end'
                height={60}
              />
              <YAxis
                tick={{ fontSize: 12 }}
                tickFormatter={formatYAxisTick}
                width={80}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              {(chart.data?.datasets || []).map((dataset, i) => (
                <Bar
                  key={i}
                  dataKey={`dataset_${i}`}
                  name={dataset.label || `Dataset ${i}`}
                  fill={COLORS[i % COLORS.length]}
                  radius={[4, 4, 0, 0]}
                />
              ))}
            </BarChart>
          );
      }
    } catch (error) {
      console.error("Chart rendering error:", error);
      return (
        <div className='flex items-center justify-center h-full text-red-500'>
          <div className='text-center'>
            <BarChart3 className='w-12 h-12 mx-auto mb-2 text-red-400' />
            <p className='text-sm'>Chart rendering error</p>
          </div>
        </div>
      );
    }
  };

  const renderDataTable = () => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      className='mt-4 overflow-hidden'
    >
      <div className='bg-gray-50 rounded-xl p-4 border border-gray-200'>
        <h4 className='font-bold text-gray-900 mb-3 flex items-center text-sm'>
          <div className='p-1.5 bg-gray-600 rounded-lg mr-2'>
            <Table className='w-4 h-4 text-white' />
          </div>
          Data Table
        </h4>
        <div className='overflow-x-auto'>
          <table className='w-full text-xs bg-white rounded-lg shadow-sm overflow-hidden'>
            <thead>
              <tr className='bg-gray-100'>
                <th className='text-left py-2 px-3 font-bold text-gray-800 border-b border-gray-300'>
                  {chart.x_axis
                    ?.replace("_", " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </th>
                {(chart.data?.datasets || []).slice(0, 2).map((dataset, i) => (
                  <th
                    key={i}
                    className='text-left py-2 px-3 font-bold text-gray-800 border-b border-gray-300'
                  >
                    {dataset.label || `Value ${i + 1}`}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(chart.data?.labels || []).slice(0, 10).map((label, i) => (
                <tr
                  key={i}
                  className={`border-b border-gray-100 hover:bg-blue-50 transition-colors duration-200 ${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className='py-2 px-3 font-medium text-gray-900'>
                    <span
                      className='block truncate max-w-[100px]'
                      title={String(label)}
                    >
                      {String(label).length > 15
                        ? `${String(label).substring(0, 15)}...`
                        : label}
                    </span>
                  </td>
                  {(chart.data?.datasets || [])
                    .slice(0, 2)
                    .map((dataset, j) => (
                      <td key={j} className='py-2 px-3 text-gray-700'>
                        <span className='font-medium'>
                          {(() => {
                            const value = dataset.data?.[i];
                            if (typeof value === "number") {
                              return value.toLocaleString();
                            } else if (typeof value === "string") {
                              return value;
                            } else if (value === null || value === undefined) {
                              return "N/A";
                            } else {
                              return String(value);
                            }
                          })()}
                        </span>
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
          {(chart.data?.labels?.length || 0) > 10 && (
            <div className='text-center mt-2'>
              <span className='text-xs text-gray-500'>
                Showing 10 of {chart.data?.labels?.length} rows
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  const calculateStats = () => {
    try {
      const values = chart.data?.datasets?.[0]?.data || [];
      const numericValues = values.filter(
        (val) => typeof val === "number" && !isNaN(val)
      );

      if (numericValues.length === 0) {
        return { sum: 0, avg: 0, min: 0, max: 0, count: 0 };
      }

      const sum = numericValues.reduce((a, b) => a + b, 0);
      const avg = sum / numericValues.length;
      const min = Math.min(...numericValues);
      const max = Math.max(...numericValues);

      return { sum, avg, min, max, count: numericValues.length };
    } catch (error) {
      console.error("Stats calculation error:", error);
      return { sum: 0, avg: 0, min: 0, max: 0, count: 0 };
    }
  };

  const stats = calculateStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'
    >
      {/* Header */}
      <div className='p-4 border-b border-gray-100'>
        <div className='flex items-center justify-between mb-3'>
          <div className='flex items-center space-x-3'>
            <div className='p-2 rounded-lg bg-blue-500 text-white'>
              {getChartIcon(currentChartType)}
            </div>
            <div>
              <h3 className='text-lg font-semibold text-gray-900 truncate'>
                {chart.title}
              </h3>
              <span className='text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md'>
                {CHART_TYPES.find((c) => c.type === currentChartType)?.label ||
                  "Chart"}
              </span>
            </div>
          </div>

          <div className='flex items-center space-x-2'>
            {/* Chart Type Selector */}
            <div className='flex bg-gray-100 rounded-lg p-1'>
              {CHART_TYPES.map((chartType) => (
                <button
                  key={chartType.type}
                  onClick={() => setCurrentChartType(chartType.type)}
                  className={`p-2 rounded-md transition-all duration-200 ${
                    currentChartType === chartType.type
                      ? "bg-white shadow-sm text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  title={chartType.label}
                >
                  <chartType.icon className='w-4 h-4' />
                </button>
              ))}
            </div>

            {/* Toggle Table Button */}
            <button
              onClick={() => setShowTable(!showTable)}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showTable
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              title='Toggle Data Table'
            >
              {showTable ? (
                <EyeOff className='w-4 h-4' />
              ) : (
                <Eye className='w-4 h-4' />
              )}
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className='grid grid-cols-4 gap-3'>
          <div className='text-center p-2 bg-blue-50 rounded-lg'>
            <p className='text-xs text-blue-600 font-medium'>Total</p>
            <p className='text-sm font-bold text-blue-900'>
              {stats.sum.toLocaleString()}
            </p>
          </div>
          <div className='text-center p-2 bg-green-50 rounded-lg'>
            <p className='text-xs text-green-600 font-medium'>Avg</p>
            <p className='text-sm font-bold text-green-900'>
              {stats.avg.toFixed(0)}
            </p>
          </div>
          <div className='text-center p-2 bg-purple-50 rounded-lg'>
            <p className='text-xs text-purple-600 font-medium'>Max</p>
            <p className='text-sm font-bold text-purple-900'>
              {stats.max.toLocaleString()}
            </p>
          </div>
          <div className='text-center p-2 bg-orange-50 rounded-lg'>
            <p className='text-xs text-orange-600 font-medium'>Count</p>
            <p className='text-sm font-bold text-orange-900'>{stats.count}</p>
          </div>
        </div>
      </div>

      {/* Chart Container - Fixed Height to Prevent Overflow */}
      <div className='h-80 p-4'>
        <ResponsiveContainer width='100%' height='100%'>
          {renderChart()}
        </ResponsiveContainer>
      </div>

      {/* Data Table */}
      <AnimatePresence>
        {showTable && (
          <div className='border-t border-gray-100'>{renderDataTable()}</div>
        )}
      </AnimatePresence>

      {/* Insights Section */}
      {chart.insights && (
        <div className='p-4 border-t border-gray-100 bg-gray-50'>
          <div className='flex items-start space-x-3'>
            <div className='p-1.5 bg-blue-500 rounded-lg'>
              <TrendingUp className='w-4 h-4 text-white' />
            </div>
            <div>
              <h4 className='font-medium text-gray-900 mb-1 text-sm'>
                Key Insights
              </h4>
              <p className='text-gray-700 text-xs leading-relaxed'>
                {chart.insights.length > 120
                  ? `${chart.insights.substring(0, 120)}...`
                  : chart.insights}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className='px-4 py-3 bg-gray-50 border-t border-gray-100'>
        <div className='flex justify-between items-center text-xs text-gray-600'>
          <span>
            {chart.x_axis
              ?.replace("_", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}{" "}
            ×{" "}
            {chart.y_axis
              ?.replace("_", " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </span>
          <button
            className='flex items-center space-x-1 px-2 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200'
            title='Download Chart'
          >
            <Download className='w-3 h-3' />
            <span>Export</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
