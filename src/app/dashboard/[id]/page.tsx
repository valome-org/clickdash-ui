"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ChartsGrid from "../../components/ChartsGrid";
import DashboardFooter from "../../components/DashboardFooter";
import DashboardHeader from "../../components/DashboardHeader";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import InsightsSection from "../../components/InsightsSection";
import KeyMetrics from "../../components/KeyMetrics";
import LoadingState from "../../components/LoadingState";

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

  if (loading) {
    return <LoadingState />;
  }

  if (error || !dashboard) {
    return <ErrorState error={error || "Dashboard not found"} />;
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8'>
        <DashboardHeader
          title={dashboard.dashboard_config.title}
          summary={dashboard.dashboard_config.summary}
        />

        <KeyMetrics metrics={dashboard.dashboard_config.key_metrics} />

        <InsightsSection insights={dashboard.dashboard_config.insights} />

        {dashboard.dashboard_config.charts.length > 0 ? (
          <ChartsGrid charts={dashboard.dashboard_config.charts} />
        ) : (
          <EmptyState />
        )}

        <DashboardFooter />
      </div>
    </div>
  );
}
