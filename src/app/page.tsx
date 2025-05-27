"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push("/dashboard/history");
      } else {
        router.push("/login");
      }
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
        <div className='animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600'></div>
      </div>
    );
  }

  // Show landing page briefly while redirecting
  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center'>
          <h1 className='text-6xl font-bold text-gray-900 mb-6'>ClickDash</h1>
          <p className='text-xl text-gray-600 mb-8'>
            Transform your Excel files into beautiful, interactive dashboards
            with AI
          </p>
          <div className='space-x-4'>
            <Link
              href='/login'
              className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-block'
            >
              Get Started
            </Link>
            <Link
              href='/register'
              className='bg-white hover:bg-gray-50 text-blue-600 border border-blue-600 px-8 py-3 rounded-lg font-medium transition-colors duration-200 inline-block'
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
