"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChartsGrid from "../../components/ChartsGrid";
import DashboardFooter from "../../components/DashboardFooter";
import DashboardHeader from "../../components/DashboardHeader";
import DashboardOverview from "../../components/DashboardOverview";
import EmptyState from "../../components/EmptyState";
import ErrorState from "../../components/ErrorState";
import InsightsSection from "../../components/InsightsSection";
import KeyMetrics from "../../components/KeyMetrics";
import LoadingState from "../../components/LoadingState";
import { DashboardData } from "../../types/dashboard";

export default function DashboardPage() {
  const params = useParams();
  const router = useRouter();
  const dashboardId = params.id as string;
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token, logout } = useAuth();

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchDashboard = async () => {
      if (!token) return;

      try {
        setLoading(true);
        const backendUrl =
          process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
        const response = await fetch(
          `${backendUrl}/api/dashboard/${dashboardId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 401) {
          logout();
          router.push("/login");
          return;
        }

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
  }, [dashboardId, user, token, router, logout]);

  if (!user || loading) {
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

        <DashboardOverview charts={dashboard.dashboard_config.charts} />

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
