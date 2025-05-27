/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

export default function DashboardHistoryPage() {
  const [dashboards, setDashboards] = useState<Dashboard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const { user, token, logout } = useAuth();
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
    if (!user) {
      router.push("/login");
      return;
    }
    fetchDashboards();
  }, [user, router, fetchDashboards]);

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
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-8'>
        {/* Header */}
        <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
            <div>
              <h1 className='text-3xl font-bold text-gray-900'>
                Dashboard History
              </h1>
              <p className='text-gray-600 mt-2'>
                Manage and view all your created dashboards
              </p>
            </div>
            <div className='mt-4 md:mt-0 flex space-x-4'>
              <Link
                href='/upload'
                className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200'
              >
                Create New Dashboard
              </Link>
              <button
                onClick={logout}
                className='bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200'
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className='bg-white rounded-2xl shadow-xl p-6 mb-8'>
          <div className='flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0'>
            <div className='flex-1'>
              <input
                type='text'
                placeholder='Search dashboards...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              />
            </div>
            <div>
              <select
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "newest" | "oldest" | "title")
                }
                className='px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
              >
                <option value='newest'>Newest First</option>
                <option value='oldest'>Oldest First</option>
                <option value='title'>Title A-Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8'>
            {error}
          </div>
        )}

        {/* Dashboard Grid */}
        {filteredAndSortedDashboards.length === 0 ? (
          <div className='bg-white rounded-2xl shadow-xl p-12 text-center'>
            <div className='text-gray-400 text-6xl mb-4'>📊</div>
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No Dashboards Found
            </h3>
            <p className='text-gray-600 mb-6'>
              {searchTerm
                ? "No dashboards match your search criteria."
                : "You haven't created any dashboards yet."}
            </p>
            <Link
              href='/upload'
              className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 inline-block'
            >
              Create Your First Dashboard
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {filteredAndSortedDashboards.map((dashboard) => (
              <div
                key={dashboard.dashboard_id}
                className='bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300'
              >
                <div className='p-6'>
                  <div className='flex items-start justify-between mb-4'>
                    <h3 className='text-xl font-semibold text-gray-900 truncate'>
                      {dashboard.dashboard_config.title}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        dashboard.status === "ready"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {dashboard.status}
                    </span>
                  </div>

                  <p className='text-gray-600 text-sm mb-4 line-clamp-3'>
                    {dashboard.dashboard_config.summary}
                  </p>

                  <div className='flex items-center justify-between text-sm text-gray-500 mb-4'>
                    <span>
                      {dashboard.dashboard_config.charts.length} charts
                    </span>
                    <span>
                      {new Date(dashboard.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className='flex space-x-2'>
                    <Link
                      href={`/dashboard/${dashboard.dashboard_id}`}
                      className='flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 px-4 rounded-lg font-medium transition-colors duration-200'
                    >
                      View
                    </Link>
                    <button
                      onClick={() => deleteDashboard(dashboard.dashboard_id)}
                      className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        {dashboards.length > 0 && (
          <div className='bg-white rounded-2xl shadow-xl p-6 mt-8'>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Statistics
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='text-center'>
                <div className='text-2xl font-bold text-blue-600'>
                  {dashboards.length}
                </div>
                <div className='text-sm text-gray-600'>Total Dashboards</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-green-600'>
                  {dashboards.reduce(
                    (sum, d) => sum + d.dashboard_config.charts.length,
                    0
                  )}
                </div>
                <div className='text-sm text-gray-600'>Total Charts</div>
              </div>
              <div className='text-center'>
                <div className='text-2xl font-bold text-purple-600'>
                  {dashboards.filter((d) => d.status === "ready").length}
                </div>
                <div className='text-sm text-gray-600'>Ready Dashboards</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
