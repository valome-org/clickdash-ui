"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdError, MdInsights, MdTableChart } from "react-icons/md";

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
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
      tension?: number;
    }>;
  };
}

interface DashboardConfig {
  title: string;
  charts: ChartConfig[];
  insights: string;
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

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center'>
        <div className='text-center'>
          <AiOutlineLoading3Quarters className='w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin' />
          <h2 className='text-xl font-semibold text-gray-700'>
            Loading Dashboard...
          </h2>
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
              <h1 className='text-3xl font-bold text-gray-900'>
                {dashboard.dashboard_config.title}
              </h1>
            </div>
            <button
              onClick={() => (window.location.href = "/")}
              className='bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors'
            >
              Upload New File
            </button>
          </div>
        </div>

        {/* Insights */}
        {dashboard.dashboard_config.insights && (
          <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
            <div className='flex items-center space-x-3 mb-4'>
              <MdInsights className='w-6 h-6 text-green-500' />
              <h2 className='text-xl font-semibold text-gray-800'>
                Data Insights
              </h2>
            </div>
            <p className='text-gray-600 whitespace-pre-line'>
              {dashboard.dashboard_config.insights}
            </p>
          </div>
        )}

        {/* Charts */}
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          {dashboard.dashboard_config.charts.map((chart, index) => (
            <div key={index} className='bg-white rounded-2xl shadow-xl p-6'>
              <h3 className='text-lg font-semibold text-gray-800 mb-4'>
                {chart.title}
              </h3>

              {/* Simple Chart Visualization */}
              <div className='space-y-4'>
                {chart.chart_type === "bar" && (
                  <div className='space-y-2'>
                    {chart.data.labels.map((label, i) => {
                      const value = chart.data.datasets[0].data[i];
                      const maxValue = Math.max(...chart.data.datasets[0].data);
                      const percentage = (value / maxValue) * 100;

                      return (
                        <div key={i} className='flex items-center space-x-3'>
                          <div className='w-20 text-sm text-gray-600 truncate'>
                            {label}
                          </div>
                          <div className='flex-1 bg-gray-200 rounded-full h-6 relative'>
                            <div
                              className='bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2'
                              style={{ width: `${percentage}%` }}
                            >
                              <span className='text-white text-xs font-medium'>
                                {value}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {chart.chart_type === "line" && (
                  <div className='text-center p-8 bg-gray-50 rounded-lg'>
                    <p className='text-gray-600'>Line Chart Visualization</p>
                    <p className='text-sm text-gray-500 mt-2'>
                      Data points: {chart.data.labels.length}
                    </p>
                    <div className='mt-4 space-y-1'>
                      {chart.data.datasets[0].data
                        .slice(0, 5)
                        .map((value, i) => (
                          <div key={i} className='text-sm text-gray-600'>
                            Point {i + 1}: {value}
                          </div>
                        ))}
                      {chart.data.datasets[0].data.length > 5 && (
                        <div className='text-sm text-gray-500'>
                          ... and {chart.data.datasets[0].data.length - 5} more
                          points
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className='mt-4 pt-4 border-t border-gray-200'>
                <div className='flex justify-between text-sm text-gray-500'>
                  <span>
                    {chart.x_axis} vs {chart.y_axis}
                  </span>
                  <span>{chart.chart_type.toUpperCase()} Chart</span>
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
              No Charts Available
            </h3>
            <p className='text-gray-500'>
              The data analysis couldn't generate charts for this file.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
