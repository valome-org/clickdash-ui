"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ChartsGrid } from "@/components/dashboard/ChartsGrid";
import { DashboardFooter } from "@/components/dashboard/DashboardFooter";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { InsightsSection } from "@/components/dashboard/InsightsSection";
import { KeyMetrics } from "@/components/dashboard/KeyMetrics";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageBackground } from "@/components/ui/page-background";
import { PageHeader } from "@/components/ui/page-header";

import { useAuth } from "@/app/contexts/AuthContext";
import { DashboardData } from "@/app/types/dashboard";
import { ApiError, dashboardApi } from "@/lib/api";
import { ROUTES } from "@/lib/routes";
import {
  ArrowLeft,
  BarChart3,
  Download,
  LineChart,
  PieChart,
  Share2,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const params = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardId = Array.isArray(params.id) ? params.id[0] : params.id;
        if (!dashboardId || !token) {
          return;
        }

        const data = await dashboardApi.getDashboard(dashboardId, token);
        setDashboard(data);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        } else {
          setError(
            err instanceof Error
              ? err.message
              : "An error occurred while fetching the dashboard"
          );
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [params.id, token]);

  if (loading) {
    return (
      <PageBackground>
        <div className='min-h-[80vh] flex flex-col items-center justify-center'>
          <LoadingSpinner
            title='Loading Dashboard'
            subtitle='Preparing your analytics insights...'
          />
        </div>
      </PageBackground>
    );
  }

  if (error || !dashboard) {
    return (
      <PageBackground>
        <div className='py-8 max-w-4xl mx-auto'>
          <Button asChild variant='outline' className='mb-8'>
            <Link href={ROUTES.DASHBOARD}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Dashboards
            </Link>
          </Button>

          <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl'>
            <CardHeader>
              <CardTitle className='text-2xl text-red-600'>
                Dashboard Not Found
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex items-center justify-center flex-col p-8'>
                <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4'>
                  <div className='text-red-600 text-2xl'>!</div>
                </div>
                <p className='text-lg text-center mb-4'>
                  {error || "The requested dashboard could not be found."}
                </p>
                <p className='text-muted-foreground text-center mb-6'>
                  This might be because the dashboard was deleted or you
                  don&apos;t have permission to view it.
                </p>
                <Button asChild>
                  <Link href={ROUTES.DASHBOARD}>
                    <ArrowLeft className='mr-2 h-4 w-4' />
                    Return to Dashboard List
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
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
          <Link href={ROUTES.DASHBOARD}>
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
        <CardHeader className='pb-0'>
          <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center'>
            <BarChart3 className='mr-3 h-6 w-6 text-blue-600' />
            Dashboard Overview
          </CardTitle>
        </CardHeader>
        <CardContent className='p-6'>
          <DashboardOverview dashboard={dashboard.dashboard_config} />
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
          <ChartsGrid charts={dashboard.dashboard_config.charts} />
        </CardContent>
      </Card>

      {/* Footer */}
      <DashboardFooter />
    </PageBackground>
  );
}
