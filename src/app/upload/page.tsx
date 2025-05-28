"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { History, Loader2, LogOut, Sparkles } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Import our reusable components
import { ActionBar } from "@/components/ui/action-bar";
import { ErrorAlert } from "@/components/ui/error-alert";
import { FileUpload } from "@/components/ui/file-upload";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageBackground } from "@/components/ui/page-background";
import { PageHeader } from "@/components/ui/page-header";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { Steps } from "@/components/ui/steps";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { user, token, logout } = useAuth();
  const router = useRouter();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file || !token) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${API_BASE_URL}/api/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.status === 401) {
        logout();
        router.push("/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Upload failed");
      }

      const data = await response.json();

      // Complete progress
      clearInterval(progressInterval);
      setUploadProgress(100);

      // Wait a bit to show 100% before redirecting
      setTimeout(() => {
        // Redirect to the new dashboard
        router.push(`/dashboard/${data.dashboard_id}`);
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      if (!error) {
        setTimeout(() => {
          setIsUploading(false);
          setUploadProgress(0);
        }, 500);
      } else {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }
  };

  // The steps for "What happens next" section
  const steps = [
    { title: "Your Excel file is securely uploaded and analyzed" },
    { title: "Our AI identifies patterns and creates relevant visualizations" },
    { title: "You get an interactive dashboard with insights and charts" },
  ];

  if (!user) {
    return <LoadingSpinner />;
  }

  return (
    <PageBackground>
      {/* Hero Header */}
      <PageHeader
        badge='AI-Powered Analytics Hub'
        title='Create Your Dashboard'
        description='Upload your data file and our AI will analyze it to create beautiful, interactive visualizations for you'
      />

      {/* Action Bar */}
      <ActionBar>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 gap-4'>
          <div>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Upload File
            </CardTitle>
            <CardDescription className='text-muted-foreground'>
              Transform your data into insights
            </CardDescription>
          </div>
          <div className='flex gap-3'>
            <Button
              variant='outline'
              asChild
              className='backdrop-blur-sm bg-white/50 border-white/30 shadow-lg'
            >
              <Link href='/dashboard'>
                <History className='mr-2 h-4 w-4' />
                Dashboard History
              </Link>
            </Button>
            <Button
              onClick={logout}
              variant='outline'
              className='text-red-600 hover:text-red-700 hover:bg-red-50 backdrop-blur-sm bg-white/50 border-white/30 shadow-lg'
            >
              <LogOut className='mr-2 h-4 w-4' />
              Logout
            </Button>
          </div>
        </div>
      </ActionBar>

      {/* Error Message */}
      <ErrorAlert message={error} />

      {/* Upload Card */}
      <div className='max-w-2xl mx-auto'>
        <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl overflow-hidden'>
          <CardHeader className='text-center pb-0'>
            <div className='w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg'>
              <svg
                className='h-10 w-10 text-white'
                viewBox='0 0 24 24'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M12 16V8M12 8L9 11M12 8L15 11'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
                <path
                  d='M16 4H8C6.89543 4 6 4.89543 6 6V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V6C18 4.89543 17.1046 4 16 4Z'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </div>
            <CardTitle className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              Upload Your Excel File
            </CardTitle>
            <CardDescription className='text-base'>
              Our AI will analyze your data and create beautiful, interactive
              dashboards
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6 p-6 pt-8'>
            {/* File Upload Component */}
            <FileUpload
              file={file}
              onChange={handleFileChange}
              disabled={isUploading}
              onValidationError={setError}
            />

            {/* Progress Indicator */}
            <ProgressIndicator
              progress={uploadProgress}
              isVisible={isUploading}
            />

            {/* Upload Button */}
            <Button
              onClick={handleUpload}
              disabled={!file || isUploading}
              className='w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg'
            >
              {isUploading ? (
                <div className='flex items-center justify-center'>
                  <Loader2 className='mr-2 h-5 w-5 animate-spin' />
                  Creating Dashboard...
                </div>
              ) : (
                <div className='flex items-center justify-center'>
                  <Sparkles className='mr-2 h-5 w-5' />
                  Create AI Dashboard
                </div>
              )}
            </Button>
          </CardContent>

          {/* Info Section with Steps Component */}
          <CardFooter className='bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-950/50 dark:to-purple-950/50 backdrop-blur-sm border-t border-blue-100/50 dark:border-blue-800/50'>
            <Steps items={steps} />
          </CardFooter>
        </Card>
      </div>
    </PageBackground>
  );
}
