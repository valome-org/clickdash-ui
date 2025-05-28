"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChartsGrid from "../../components/ChartsGrid";
import DashboardFooter from "../../components/DashboardFooter";
import DashboardOverview from "../../components/DashboardOverview";
import EmptyState from "../../components/EmptyState";
import InsightsSection from "../../components/InsightsSection";
import KeyMetrics from "../../components/KeyMetrics";
import { DashboardData } from "../../types/dashboard";

// Import reusable components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorAlert } from "@/components/ui/error-alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageBackground } from "@/components/ui/page-background";
import { PageHeader } from "@/components/ui/page-header";
import { ArrowLeft, Download, LineChart, PieChart, Share2 } from "lucide-react";

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
    return (
      <LoadingSpinner
        title='Loading Dashboard'
        subtitle='Preparing your data visualizations...'
      />
    );
  }

  if (error || !dashboard) {
    return (
      <PageBackground>
        <div className='py-8'>
          <Button asChild variant='outline' className='mb-8'>
            <Link href='/dashboard'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Dashboards
            </Link>
          </Button>
          <ErrorAlert message={error || "Dashboard not found"} />
        </div>
      </PageBackground>
    );
  }

  return (
    <PageBackground>
      <div className='mb-8 flex items-center justify-between'>
        <Button
          asChild
          variant='outline'
          className='backdrop-blur-sm bg-white/50 border-white/30 shadow-lg'
        >
          <Link href='/dashboard'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Back to Dashboards
          </Link>
        </Button>

        <div className='flex space-x-3'>
          <Button
            variant='outline'
            className='backdrop-blur-sm bg-white/50 border-white/30 shadow-lg'
          >
            <Download className='mr-2 h-4 w-4' />
            Export
          </Button>
          <Button
            variant='outline'
            className='backdrop-blur-sm bg-white/50 border-white/30 shadow-lg'
          >
            <Share2 className='mr-2 h-4 w-4' />
            Share
          </Button>
        </div>
      </div>

      {/* Dashboard Header */}
      <PageHeader
        badge='Analytics Dashboard'
        title={dashboard.dashboard_config.title}
        description={dashboard.dashboard_config.summary}
      />

      {/* Key Metrics Section */}
      <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl mb-8'>
        <CardHeader className='pb-0'>
          <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center'>
            <LineChart className='mr-3 h-6 w-6 text-blue-600' />
            Key Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <KeyMetrics metrics={dashboard.dashboard_config.key_metrics} />
        </CardContent>
      </Card>

      {/* Dashboard Overview */}
      <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl mb-8'>
        <CardContent className='p-6'>
          <DashboardOverview charts={dashboard.dashboard_config.charts} />
        </CardContent>
      </Card>

      {/* Insights Section */}
      <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl mb-8'>
        <CardHeader className='pb-0'>
          <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            AI-Generated Insights
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <InsightsSection insights={dashboard.dashboard_config.insights} />
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl mb-8'>
        <CardHeader className='pb-0'>
          <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            <PieChart className='mr-3 h-6 w-6 text-blue-600 inline' />
            Visualizations
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          {dashboard.dashboard_config.charts.length > 0 ? (
            <ChartsGrid charts={dashboard.dashboard_config.charts} />
          ) : (
            <EmptyState />
          )}
        </CardContent>
      </Card>

      <DashboardFooter />
    </PageBackground>
  );
}
