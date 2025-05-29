/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

// Import our reusable components
import { ActionBar } from "@/components/ui/action-bar";
import { ErrorAlert } from "@/components/ui/error-alert";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageBackground } from "@/components/ui/page-background";
import { PageHeader } from "@/components/ui/page-header";

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

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const fetchDashboards = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/dashboards/my`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401) {
        logout();
        router.push("/login");
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to fetch dashboards");
      }

      const data = await response.json();
      setDashboards(data.dashboards || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch dashboards"
      );
    } finally {
      setIsLoading(false);
    }
  }, [token, logout, router, API_BASE_URL]);

  useEffect(() => {
    // Only redirect if we're sure the user is not authenticated
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
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
      const response = await fetch(
        `${API_BASE_URL}/api/dashboard/${dashboardId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        setDashboards(dashboards.filter((d) => d.dashboard_id !== dashboardId));
      } else {
        throw new Error("Failed to delete dashboard");
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete dashboard"
      );
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
              <Link href='/upload'>
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

          <p className='text-lg text-muted-foreground mb-8 max-w-md mx-auto'>
            {searchTerm
              ? "Try adjusting your search terms or create a new dashboard."
              : "Transform your data into beautiful insights. Upload your first Excel file and watch the magic happen!"}
          </p>

          <Button
            asChild
            size='lg'
            className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl'
          >
            <Link href='/upload'>
              <Plus className='mr-2 h-4 w-4' />
              Create Your First Dashboard
            </Link>
          </Button>
        </div>
      ) : (
        <div>
          <BentoGrid className='max-w-none'>
            {filteredAndSortedDashboards.map((dashboard, index) => (
              <div
                key={dashboard.dashboard_id}
                className={index === 0 ? "md:col-span-2" : ""}
              >
                <BentoGridItem
                  className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 group'
                  title={
                    <div className='flex items-center justify-between'>
                      <span className='text-lg font-bold group-hover:text-blue-600 transition-colors'>
                        {dashboard.dashboard_config.title}
                      </span>
                      <Badge
                        variant={
                          dashboard.status === "ready" ? "default" : "secondary"
                        }
                        className='ml-2'
                      >
                        {dashboard.status === "ready"
                          ? "🟢 Ready"
                          : "🟡 Processing"}
                      </Badge>
                    </div>
                  }
                  description={
                    <div className='space-y-3'>
                      <p className='text-sm text-muted-foreground line-clamp-2'>
                        {dashboard.dashboard_config.summary}
                      </p>

                      <div className='flex items-center justify-between text-xs text-muted-foreground'>
                        <div className='flex items-center space-x-4'>
                          <div className='flex items-center'>
                            <FileText className='h-3 w-3 mr-1' />
                            {dashboard.dashboard_config.charts.length} charts
                          </div>
                          <div className='flex items-center'>
                            <Calendar className='h-3 w-3 mr-1' />
                            {new Date(
                              dashboard.created_at
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className='flex space-x-2 pt-2'>
                        <Button asChild className='flex-1' size='sm'>
                          <Link href={`/dashboard/${dashboard.dashboard_id}`}>
                            <TrendingUp className='mr-2 h-3 w-3' />
                            View Dashboard
                          </Link>
                        </Button>
                        <Button
                          onClick={() =>
                            deleteDashboard(dashboard.dashboard_id)
                          }
                          variant='outline'
                          size='sm'
                          className='text-red-600 hover:text-red-700 hover:bg-red-50'
                        >
                          <Trash2 className='h-3 w-3' />
                        </Button>
                      </div>
                    </div>
                  }
                  header={
                    <div className='w-full h-20 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-lg flex items-center justify-center group-hover:from-blue-400/30 group-hover:to-purple-600/30 transition-all duration-300'>
                      <Layers3 className='h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform' />
                    </div>
                  }
                />
              </div>
            ))}
          </BentoGrid>
        </div>
      )}

      {/* Statistics */}
      {dashboards.length > 0 && (
        <div className='mt-44'>
          <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl'>
            <CardHeader>
              <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center'>
                <BarChart3 className='mr-3 h-6 w-6 text-blue-600' />
                Analytics Overview
              </CardTitle>
              <CardDescription>
                Your dashboard ecosystem at a glance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/20 border border-blue-200/50'>
                  <div className='text-4xl font-bold text-blue-600 mb-2'>
                    {dashboards.length}
                  </div>
                  <div className='text-sm text-muted-foreground font-medium'>
                    Total Dashboards
                  </div>
                </div>
                <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/20 border border-green-200/50'>
                  <div className='text-4xl font-bold text-green-600 mb-2'>
                    {dashboards.reduce(
                      (sum, d) => sum + d.dashboard_config.charts.length,
                      0
                    )}
                  </div>
                  <div className='text-sm text-muted-foreground font-medium'>
                    Total Charts
                  </div>
                </div>
                <div className='text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/20 border border-purple-200/50'>
                  <div className='text-4xl font-bold text-purple-600 mb-2'>
                    {dashboards.filter((d) => d.status === "ready").length}
                  </div>
                  <div className='text-sm text-muted-foreground font-medium'>
                    Ready Dashboards
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </PageBackground>
  );
}
