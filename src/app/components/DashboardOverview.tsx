"use client";

import { motion } from "framer-motion";
import {
  Activity,
  BarChart3,
  Database,
  PieChart,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { ChartConfig } from "../types/dashboard";

interface DashboardOverviewProps {
  charts: ChartConfig[];
}

export default function DashboardOverview({ charts }: DashboardOverviewProps) {
  // Calculate overall statistics
  const calculateOverallStats = () => {
    let totalDataPoints = 0;
    const totalCharts = charts.length;
    const chartTypes = new Set<string>();
    const allValues: number[] = [];

    charts.forEach((chart) => {
      chartTypes.add(chart.chart_type);
      (chart.data?.datasets || []).forEach((dataset) => {
        (dataset.data || []).forEach((value) => {
          if (typeof value === "number") {
            allValues.push(value);
            totalDataPoints++;
          }
        });
      });
    });

    const sum = allValues.reduce((a, b) => a + b, 0);
    const avg = allValues.length > 0 ? sum / allValues.length : 0;
    const min = allValues.length > 0 ? Math.min(...allValues) : 0;
    const max = allValues.length > 0 ? Math.max(...allValues) : 0;

    return {
      totalDataPoints,
      totalCharts,
      chartTypes: Array.from(chartTypes),
      sum,
      avg,
      min,
      max,
      trend:
        allValues.length > 1
          ? allValues[allValues.length - 1] > allValues[0]
            ? "up"
            : "down"
          : "neutral",
    };
  };

  const stats = calculateOverallStats();

  const getChartTypeIcon = (type: string) => {
    switch (type) {
      case "bar":
        return <BarChart3 className='w-4 h-4' />;
      case "pie":
        return <PieChart className='w-4 h-4' />;
      case "line":
        return <Activity className='w-4 h-4' />;
      default:
        return <BarChart3 className='w-4 h-4' />;
    }
  };

  const overviewCards = [
    {
      title: "Total Charts",
      value: stats.totalCharts,
      icon: <BarChart3 className='w-6 h-6' />,
      color: "blue",
      description: `${stats.chartTypes.length} different types`,
    },
    {
      title: "Data Points",
      value: stats.totalDataPoints.toLocaleString(),
      icon: <Database className='w-6 h-6' />,
      color: "green",
      description: "Across all datasets",
    },
    {
      title: "Average Value",
      value: stats.avg.toFixed(1),
      icon: <Activity className='w-6 h-6' />,
      color: "purple",
      description: `Range: ${stats.min} - ${stats.max.toLocaleString()}`,
    },
    {
      title: "Data Trend",
      value: stats.trend === "up" ? "+" : stats.trend === "down" ? "-" : "~",
      icon:
        stats.trend === "up" ? (
          <TrendingUp className='w-6 h-6' />
        ) : stats.trend === "down" ? (
          <TrendingDown className='w-6 h-6' />
        ) : (
          <Activity className='w-6 h-6' />
        ),
      color:
        stats.trend === "up"
          ? "green"
          : stats.trend === "down"
          ? "red"
          : "gray",
      description:
        stats.trend === "up"
          ? "Trending upward"
          : stats.trend === "down"
          ? "Trending downward"
          : "Stable",
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "text-blue-600",
          text: "text-blue-800",
        };
      case "green":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "text-green-600",
          text: "text-green-800",
        };
      case "purple":
        return {
          bg: "bg-purple-50",
          border: "border-purple-200",
          icon: "text-purple-600",
          text: "text-purple-800",
        };
      case "red":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "text-red-600",
          text: "text-red-800",
        };
      default:
        return {
          bg: "bg-gray-50",
          border: "border-gray-200",
          icon: "text-gray-600",
          text: "text-gray-800",
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='mb-8'
    >
      {/* Overview Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6'>
        {overviewCards.map((card, index) => {
          const colors = getColorClasses(card.color);
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${colors.bg} ${colors.border} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer`}
            >
              <div className='flex items-center justify-between mb-3'>
                <div className={`p-2 rounded-lg bg-white ${colors.icon}`}>
                  {card.icon}
                </div>
                <div className={`text-2xl font-bold ${colors.text}`}>
                  {card.value}
                </div>
              </div>
              <h3 className={`font-semibold ${colors.text} mb-1`}>
                {card.title}
              </h3>
              <p className='text-gray-600 text-sm'>{card.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Types Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className='bg-white rounded-2xl shadow-xl p-6'
      >
        <div className='flex items-center justify-between mb-4'>
          <h3 className='text-lg font-semibold text-gray-800 flex items-center'>
            <BarChart3 className='w-5 h-5 mr-2 text-blue-600' />
            Chart Types Overview
          </h3>
          <div className='text-sm text-gray-500'>
            {stats.chartTypes.length} types • {stats.totalCharts} total charts
          </div>
        </div>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4'>
          {stats.chartTypes.map((type, index) => {
            const count = charts.filter(
              (chart) => chart.chart_type === type
            ).length;
            const percentage = ((count / stats.totalCharts) * 100).toFixed(1);

            return (
              <div
                key={index}
                className='bg-gray-50 rounded-lg p-4 text-center hover:bg-gray-100 transition-colors'
              >
                <div className='flex justify-center mb-2 text-blue-600'>
                  {getChartTypeIcon(type)}
                </div>
                <div className='text-sm font-medium text-gray-800 capitalize mb-1'>
                  {type}
                </div>
                <div className='text-xs text-gray-500'>
                  {count} charts ({percentage}%)
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}
