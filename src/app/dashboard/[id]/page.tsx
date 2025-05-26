"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  MdAnalytics,
  MdBarChart,
  MdDonutLarge,
  MdError,
  MdInsights,
  MdScatterPlot,
  MdShowChart,
  MdSpeed,
  MdTableChart,
  MdTrendingUp,
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

interface KeyMetric {
  metric: string;
  value: string;
  description: string;
}

interface DashboardConfig {
  title: string;
  charts: ChartConfig[];
  insights: string;
  summary: string;
  key_metrics: KeyMetric[];
}

interface DashboardData {
  dashboard_id: string;
  dashboard_config: DashboardConfig;
  status: string;
  message?: string;
}

export default function DashboardPage() {
  const params = useParams();
  const dashboardId = params.id as string;
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        const backendUrl =
          process.env.NEXT_PUBLIC_PYTHON_SERVICE_URL || "http://localhost:8000";
        const response = await fetch(`${backendUrl}/dashboard/${dashboardId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch dashboard: ${response.statusText}`);
        }

        const data = await response.json();
        setDashboard(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard"
        );
      } finally {
        setLoading(false);
      }
    };

    if (dashboardId) {
      fetchDashboard();
    }
  }, [dashboardId]);

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

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='text-center'>
          <AiOutlineLoading3Quarters className='w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin' />
          <h2 className='text-xl font-semibold text-gray-700'>
            Generating AI Dashboard...
          </h2>
          <p className='text-gray-500 mt-2'>
            Analyzing your data with advanced AI
          </p>
        </div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
        <div className='bg-white rounded-2xl shadow-xl p-8 text-center max-w-md'>
          <MdError className='w-16 h-16 text-red-500 mx-auto mb-4' />
          <h2 className='text-xl font-semibold text-gray-700 mb-4'>
            Dashboard Not Found
          </h2>
          <p className='text-red-600 mb-6'>{error || "Dashboard not found"}</p>
          <button
            onClick={() => (window.location.href = "/")}
            className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center space-x-3'>
              <MdTableChart className='w-8 h-8 text-blue-500' />
              <div>
                <h1 className='text-3xl font-bold text-gray-900'>
                  {dashboard.dashboard_config.title}
                </h1>
                {dashboard.dashboard_config.summary && (
                  <p className='text-gray-600 mt-1'>
                    {dashboard.dashboard_config.summary}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors'
            >
              Upload New File
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        {dashboard.dashboard_config.key_metrics &&
          dashboard.dashboard_config.key_metrics.length > 0 && (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
              {dashboard.dashboard_config.key_metrics.map((metric, index) => (
                <div key={index} className='bg-white rounded-2xl shadow-xl p-6'>
                  <div className='flex items-center space-x-3 mb-2'>
                    <MdTrendingUp className='w-6 h-6 text-blue-500' />
                    <h3 className='text-lg font-semibold text-gray-800'>
                      {metric.metric}
                    </h3>
                  </div>
                  <div className='text-3xl font-bold text-blue-600 mb-2'>
                    {metric.value}
                  </div>
                  <p className='text-gray-600 text-sm'>{metric.description}</p>
                </div>
              ))}
            </div>
          )}

        {/* Main Insights */}
        {dashboard.dashboard_config.insights && (
          <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
            <div className='flex items-center space-x-3 mb-4'>
              <MdInsights className='w-6 h-6 text-green-500' />
              <h2 className='text-xl font-semibold text-gray-800'>
                AI-Generated Insights
              </h2>
            </div>
            <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
              <p className='text-gray-700 leading-relaxed'>
                {dashboard.dashboard_config.insights}
              </p>
            </div>
          </div>
        )}

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {dashboard.dashboard_config.charts.map((chart, index) => (
            <div key={index} className='bg-white rounded-2xl shadow-xl p-6'>
              <div className='flex items-center space-x-3 mb-4'>
                <div
                  className={`p-2 rounded-lg ${getColorSchemeClass(
                    chart.color_scheme || "primary"
                  )}`}
                >
                  {getChartIcon(chart.chart_type)}
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-gray-800'>
                    {chart.title}
                  </h3>
                  <p className='text-sm text-gray-500'>
                    {chart.chart_type.toUpperCase()} Chart
                  </p>
                </div>
              </div>

              {/* Enhanced Chart Visualization */}
              <div className='space-y-4'>
                {chart.chart_type === "bar" && (
                  <div className='space-y-3'>
                    {chart.data.labels.map((label, i) => {
                      const value = chart.data.datasets[0].data[i];
                      const maxValue = Math.max(...chart.data.datasets[0].data);
                      const percentage =
                        maxValue > 0 ? (value / maxValue) * 100 : 0;

                      return (
                        <div key={i} className='space-y-1'>
                          <div className='flex justify-between text-sm'>
                            <span className='text-gray-600 font-medium truncate max-w-[60%]'>
                              {label}
                            </span>
                            <span className='text-gray-900 font-semibold'>
                              {typeof value === "number"
                                ? value.toLocaleString()
                                : value}
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
                )}

                {chart.chart_type === "line" && (
                  <div className='bg-gray-50 rounded-lg p-6'>
                    <div className='text-center mb-4'>
                      <MdShowChart className='w-12 h-12 text-green-500 mx-auto mb-2' />
                      <p className='text-gray-700 font-medium'>
                        Line Chart Visualization
                      </p>
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
                          {Math.min(
                            ...chart.data.datasets[0].data
                          ).toLocaleString()}
                        </p>
                      </div>
                      <div className='bg-white rounded-lg p-3'>
                        <p className='text-sm text-gray-500'>Max Value</p>
                        <p className='text-lg font-semibold text-gray-800'>
                          {Math.max(
                            ...chart.data.datasets[0].data
                          ).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {chart.chart_type === "pie" && (
                  <div className='space-y-3'>
                    {chart.data.labels.map((label, i) => {
                      const value = chart.data.datasets[0].data[i];
                      const total = chart.data.datasets[0].data.reduce(
                        (a, b) => a + b,
                        0
                      );
                      const percentage =
                        total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                      const bgColors = chart.data.datasets[0]
                        .backgroundColor as string[];
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
                            <span className='text-gray-900 font-semibold'>
                              {percentage}%
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {chart.chart_type === "scatter" && (
                  <div className='bg-gray-50 rounded-lg p-6 text-center'>
                    <MdScatterPlot className='w-12 h-12 text-purple-500 mx-auto mb-2' />
                    <p className='text-gray-700 font-medium'>Scatter Plot</p>
                    <p className='text-sm text-gray-500 mt-2'>
                      Correlation between {chart.x_axis} and {chart.y_axis}
                    </p>
                  </div>
                )}
              </div>

              {/* Chart Insights */}
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
          ))}
        </div>

        {/* Empty State */}
        {dashboard.dashboard_config.charts.length === 0 && (
          <div className='bg-white rounded-2xl shadow-xl p-12 text-center'>
            <MdTableChart className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-700 mb-2'>
              No Charts Generated
            </h3>
            <p className='text-gray-500'>
              The AI couldn&apos;t generate meaningful charts for this dataset.
              Try uploading a different file with more structured data.
            </p>
          </div>
        )}

        {/* Footer */}
        <div className='mt-12 text-center'>
          <div className='flex items-center justify-center space-x-6 text-sm text-gray-500'>
            <div className='flex items-center space-x-2'>
              <MdSpeed className='w-4 h-4' />
              <span>AI-Powered</span>
            </div>
            <div className='flex items-center space-x-2'>
              <MdAnalytics className='w-4 h-4' />
              <span>Smart Analytics</span>
            </div>
            <div className='flex items-center space-x-2'>
              <MdInsights className='w-4 h-4' />
              <span>Actionable Insights</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
