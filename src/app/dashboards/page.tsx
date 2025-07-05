"use client";

import { ActionBar } from "@/components/ui/action-bar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ErrorAlert } from "@/components/ui/error-alert";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageBackground } from "@/components/ui/page-background";
import { PageHeader } from "@/components/ui/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { dashboardApi } from "@/lib/api";
import { ROUTES } from "@/lib/routes";
import {
  BarChart3,
  Calendar,
  FileText,
  Filter,
  Layers3,
  LogOut,
  Plus,
  Search,
  Sparkles,
  Trash2,
  TrendingUp,
} from "lucide-react";
import { ApiError } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

interface Dashboard {
  dashboard_id: string;
  dashboard_config: {
    title: string;
    summary: string;
    charts: any[];
    insights: string;
    key_metrics: any[];
  };
  status: string;
  created_at: string;
  file_url: string;
  user_id: number;
}

export default function DashboardPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const { user, token, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const fetchDashboards = useCallback(async () => {
    if (!token) return;

    try {
      const data = await dashboardApi.getDashboards(token);
      setDashboards(data.dashboards || []);
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.statusCode === 401) {
          logout();
          router.push(ROUTES.LOGIN);
          return;
        }
        setError(err.message);
      } else {
        setError(
          err instanceof Error ? err.message : "Failed to fetch dashboards"
        );
      }
    } finally {
      setIsLoading(false);
    }
  }, [token, logout, router]);

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace(ROUTES.LOGIN);
      return;
    }

    // Fetch dashboards if user is authenticated and we have a token
    if (isAuthenticated && user && token) {
      fetchDashboards();
    }
  }, [user, token, isAuthenticated, isLoading, router, fetchDashboards]);

  const deleteDashboard = async (dashboardId: string) => {
    if (!token || !confirm("Are you sure you want to delete this dashboard?"))
      return;

    try {
      await dashboardApi.deleteDashboard(dashboardId, token);
      setDashboards(dashboards.filter((d) => d.dashboard_id !== dashboardId));
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(
          err instanceof Error ? err.message : "Failed to delete dashboard"
        );
      }
    }
  };

  const filteredAndSortedDashboards = dashboards
    .filter(
      (dashboard) =>
        dashboard.dashboard_config.title
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        dashboard.dashboard_config.summary
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        case "oldest":
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        case "title":
          return a.dashboard_config.title.localeCompare(
            b.dashboard_config.title
          );
        default:
          return 0;
      }
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageBackground>
      {/* Hero Header */}
      <PageHeader
        badge='AI-Powered Analytics Hub'
        title='ClickDash'
        description='Your command center for data-driven insights. Create, explore, and manage beautiful dashboards that transform raw data into actionable intelligence.'
      />

      {/* Action Bar */}
      <ActionBar>
        <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0'>
          <div className='flex flex-col sm:flex-row gap-4 flex-1'>
            <div className='relative flex-1 max-w-md'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
              <Input
                type='text'
                placeholder='Search your dashboard universe...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-10 bg-white/50 backdrop-blur-sm border-white/30'
              />
            </div>

            <Select
              value={sortBy}
              onValueChange={(value: "newest" | "oldest" | "title") =>
                setSortBy(value)
              }
            >
              <SelectTrigger className='w-[180px] bg-white/50 backdrop-blur-sm border-white/30'>
                <Filter className='h-4 w-4 mr-2' />
                <SelectValue placeholder='Sort by' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='newest'>🕒 Newest First</SelectItem>
                <SelectItem value='oldest'>📅 Oldest First</SelectItem>
                <SelectItem value='title'>🔤 Title A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className='flex space-x-3'>
            <Button
              asChild
              size='lg'
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
            >
              <Link href={ROUTES.UPLOAD}>
                <Plus className='mr-2 h-4 w-4' />
                Create Dashboard
              </Link>
            </Button>
            <Button
              onClick={logout}
              variant='outline'
              size='lg'
              className='backdrop-blur-sm bg-white/50 border-white/30 shadow-lg'
            >
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </Button>
          </div>
        </div>
      </ActionBar>

      {/* Error Message */}
      <ErrorAlert message={error} />

      {/* Dashboard Grid */}
      {filteredAndSortedDashboards.length === 0 ? (
        <div className='text-center py-20'>
          <div className='relative inline-block mb-8'>
            <div className='w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl'>
              <BarChart3 className='h-16 w-16 text-white' />
            </div>
            <div className='absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center'>
              <Sparkles className='h-4 w-4 text-yellow-800' />
            </div>
          </div>

          <h3 className='text-3xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
            {searchTerm
              ? "No Dashboards Found"
              : "Your Dashboard Journey Begins"}
          </h3>

          <p className='text-xl text-muted-foreground mb-8 max-w-2xl mx-auto'>
            {searchTerm
              ? `We couldn't find any dashboards matching "${searchTerm}". Try adjusting your search terms or explore your other dashboards.`
              : "Ready to turn your data into insights? Create your first dashboard and discover the power of AI-driven analytics."}
          </p>

          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <Button
              asChild
              size='lg'
              className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
            >
              <Link href={ROUTES.UPLOAD}>
                <Plus className='mr-2 h-4 w-4' />
                Create Your First Dashboard
              </Link>
            </Button>
            {searchTerm && (
              <Button
                onClick={() => setSearchTerm("")}
                variant='outline'
                size='lg'
                className='backdrop-blur-sm bg-white/50 border-white/30 shadow-lg'
              >
                Clear Search
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className='container mx-auto px-4 max-w-7xl'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr'>
            {filteredAndSortedDashboards.map((dashboard, index) => (
              <div
                key={dashboard.dashboard_id}
                className={`group relative overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border border-white/20 rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 ${
                  index === 0 ? "md:col-span-2" : ""
                }`}
              >
                <div className='flex flex-col h-full p-4 md:p-6'>
                  {/* Header */}
                  <div className='flex items-start justify-between mb-4 gap-2'>
                    <div className='flex-1 min-w-0'>
                      <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-2'>
                        <Badge
                          variant='outline'
                          className='bg-blue-100 text-blue-700 border-blue-300 w-fit'
                        >
                          {dashboard.status}
                        </Badge>
                        <div className='flex items-center text-sm text-muted-foreground'>
                          <Calendar className='h-3 w-3 mr-1' />
                          {new Date(dashboard.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className='text-lg md:text-xl font-bold mb-2 line-clamp-2'>
                        {dashboard.dashboard_config.title}
                      </h3>
                      <p className='text-sm text-muted-foreground mb-4 line-clamp-3'>
                        {dashboard.dashboard_config.summary}
                      </p>
                    </div>
                    <Button
                      onClick={() => deleteDashboard(dashboard.dashboard_id)}
                      variant='ghost'
                      size='sm'
                      className='opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 shrink-0'
                    >
                      <Trash2 className='h-4 w-4' />
                    </Button>
                  </div>

                  {/* Stats */}
                  <div className='grid grid-cols-2 gap-3 mb-4 text-sm'>
                    <div className='flex items-center gap-2 min-w-0'>
                      <div className='h-8 w-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center shrink-0'>
                        <BarChart3 className='h-4 w-4 text-white' />
                      </div>
                      <div className='min-w-0'>
                        <p className='text-muted-foreground text-xs'>Charts</p>
                        <p className='font-semibold'>
                          {dashboard.dashboard_config.charts?.length || 0}
                        </p>
                      </div>
                    </div>

                    <div className='flex items-center gap-2 min-w-0'>
                      <div className='h-8 w-8 bg-gradient-to-br from-purple-400 to-purple-600 rounded-lg flex items-center justify-center shrink-0'>
                        <TrendingUp className='h-4 w-4 text-white' />
                      </div>
                      <div className='min-w-0'>
                        <p className='text-muted-foreground text-xs'>Metrics</p>
                        <p className='font-semibold'>
                          {dashboard.dashboard_config.key_metrics?.length || 0}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Key Metrics Preview */}
                  {dashboard.dashboard_config.key_metrics?.length > 0 && (
                    <div className='flex flex-wrap gap-1.5 mb-4'>
                      {dashboard.dashboard_config.key_metrics
                        .slice(0, 3)
                        .map((metric: any, idx: number) => (
                          <div
                            key={idx}
                            className='flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full text-xs border border-blue-200 max-w-full'
                          >
                            <Layers3 className='h-3 w-3 text-blue-600 shrink-0' />
                            <span className='font-medium text-blue-700 truncate'>
                              {metric.metric}
                            </span>
                          </div>
                        ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className='mt-auto flex gap-2'>
                    <Button
                      asChild
                      className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg text-sm'
                    >
                      <Link
                        href={ROUTES.DASHBOARD_DETAIL(dashboard.dashboard_id)}
                      >
                        <FileText className='mr-2 h-4 w-4' />
                        View Dashboard
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </PageBackground>
  );
}
