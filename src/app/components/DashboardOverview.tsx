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
          bg: "bg-gradient-to-br from-blue-500/10 to-blue-600/20",
          border: "border-blue-200/50",
          icon: "text-blue-600",
          text: "text-blue-800 dark:text-blue-300",
          iconBg: "bg-blue-100/80 dark:bg-blue-900/30",
        };
      case "green":
        return {
          bg: "bg-gradient-to-br from-green-500/10 to-green-600/20",
          border: "border-green-200/50",
          icon: "text-green-600",
          text: "text-green-800 dark:text-green-300",
          iconBg: "bg-green-100/80 dark:bg-green-900/30",
        };
      case "purple":
        return {
          bg: "bg-gradient-to-br from-purple-500/10 to-purple-600/20",
          border: "border-purple-200/50",
          icon: "text-purple-600",
          text: "text-purple-800 dark:text-purple-300",
          iconBg: "bg-purple-100/80 dark:bg-purple-900/30",
        };
      case "red":
        return {
          bg: "bg-gradient-to-br from-red-500/10 to-red-600/20",
          border: "border-red-200/50",
          icon: "text-red-600",
          text: "text-red-800 dark:text-red-300",
          iconBg: "bg-red-100/80 dark:bg-red-900/30",
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-500/10 to-gray-600/20",
          border: "border-gray-200/50",
          icon: "text-gray-600",
          text: "text-gray-800 dark:text-gray-300",
          iconBg: "bg-gray-100/80 dark:bg-gray-900/30",
        };
    }
  };

  return (
    <div>
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
              className={`${colors.bg} border ${colors.border} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 backdrop-blur-sm`}
            >
              <div className='flex items-center justify-between mb-3'>
                <div
                  className={`p-2 rounded-lg ${colors.iconBg} ${colors.icon} backdrop-blur-sm`}
                >
                  {card.icon}
                </div>
                <div className={`text-3xl font-bold ${colors.text}`}>
                  {card.value}
                </div>
              </div>
              <h3 className={`font-semibold ${colors.text} mb-1`}>
                {card.title}
              </h3>
              <p className='text-gray-600 dark:text-gray-400 text-sm'>
                {card.description}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Chart Types Summary */}
      <div className='bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm rounded-2xl border border-white/20 shadow-xl p-6'>
        <div className='flex items-center justify-between mb-6'>
          <h3 className='text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center'>
            <BarChart3 className='w-5 h-5 mr-2 text-blue-600' />
            Chart Types Overview
          </h3>
          <div className='text-sm text-gray-500 dark:text-gray-400 bg-blue-50/50 dark:bg-blue-900/30 px-3 py-1 rounded-full backdrop-blur-sm'>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className='bg-blue-50/40 dark:bg-blue-900/20 backdrop-blur-sm border border-blue-100/30 dark:border-blue-800/30 rounded-xl p-4 text-center hover:shadow-md hover:bg-blue-50/70 dark:hover:bg-blue-900/40 transition-all'
              >
                <div className='flex justify-center mb-2 text-blue-600 bg-white/70 dark:bg-slate-800/70 p-2 rounded-lg mx-auto'>
                  {getChartTypeIcon(type)}
                </div>
                <div className='text-sm font-medium text-gray-800 dark:text-gray-200 capitalize mb-1'>
                  {type}
                </div>
                <div className='text-xs text-gray-500 dark:text-gray-400'>
                  {count} charts ({percentage}%)
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
