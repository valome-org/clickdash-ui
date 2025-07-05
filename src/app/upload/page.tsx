"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useAuth } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ErrorAlert } from "@/components/ui/error-alert";
import { FileUpload } from "@/components/ui/file-upload";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageBackground } from "@/components/ui/page-background";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  AdditionalDetails,
  CategorySelection,
  VisualizationOptions,
} from "@/components/upload";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface NextStep {
  title: string;
  description: string;
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [category, setCategory] = useState<string>("");
  const [customCategory, setCustomCategory] = useState<string>("");
  const [chartTypes, setChartTypes] = useState<string[]>([]);
  const [numberOfCharts, setNumberOfCharts] = useState<string>("3");
  const [description, setDescription] = useState<string>("");

  const { user, token, logout } = useAuth();
  const router = useRouter();

  const handleFileValidationError = (message: string) => {
    setError(message);
  };

  const isFormValid = (): boolean => {
    return !!file && !!category;
  };

  const handleUpload = async () => {
    if (!file || !category) {
      setError("Please select a file and category");
      return;
    }

    setIsUploading(true);
    setError(null);

    // Simple progress simulation
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 90) progress = 90;
      setUploadProgress(Math.round(progress));
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append(
        "category",
        category === "other" ? customCategory : category
      );
      formData.append("chart_types", chartTypes.join(","));
      formData.append("number_of_charts", numberOfCharts);
      formData.append("description", description);

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
      clearInterval(progressInterval);
      setUploadProgress(100);

      setTimeout(() => {
        router.push(`/dashboard/${data.dashboard_id}`);
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setError(err instanceof Error ? err.message : "Upload failed");
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const nextSteps: NextStep[] = [
    {
      title: "Your Excel file is securely uploaded and analyzed",
      description: "Our AI engine analyzes your data structure and content",
    },
    {
      title: "AI identifies patterns and creates relevant visualizations",
      description: "Machine learning algorithms detect insights and trends",
    },
    {
      title: "You get an interactive dashboard with insights and charts",
      description:
        "Explore your data through beautiful, interactive visualizations",
    },
  ];

  if (!user) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <PageBackground>
      <div className='py-12'>
        <PageHeader
          badge='Excel to Dashboard'
          title='Create Interactive Dashboard'
          description='Upload your Excel file and get AI-powered visualizations in seconds'
        />

        <div className='max-w-4xl mx-auto'>
          <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl overflow-hidden'>
            <CardContent className='p-8 space-y-8'>
              {error && <ErrorAlert message={error} />}

              {/* File Upload Section */}
              <div>
                <h3 className='text-lg font-semibold mb-4 flex items-center'>
                  <Upload className='h-5 w-5 mr-2 text-blue-600' />
                  Excel File
                </h3>
                <FileUpload
                  onChange={setFile}
                  file={file}
                  disabled={isUploading}
                  onValidationError={handleFileValidationError}
                />
              </div>

              <Separator />

              {/* Category Selection */}
              <div>
                <h3 className='text-lg font-semibold mb-4 flex items-center'>
                  <Sparkles className='h-5 w-5 mr-2 text-purple-600' />
                  Data Category
                </h3>
                <CategorySelection
                  category={category}
                  onCategoryChange={setCategory}
                  customCategory={customCategory}
                  onCustomCategoryChange={setCustomCategory}
                  disabled={isUploading}
                />
              </div>

              <Separator />

              {/* Visualization Options */}
              <div>
                <h3 className='text-lg font-semibold mb-4 flex items-center'>
                  <ArrowRight className='h-5 w-5 mr-2 text-green-600' />
                  Visualization Preferences
                </h3>
                <VisualizationOptions
                  chartTypes={chartTypes}
                  onChartTypesChange={setChartTypes}
                  numberOfCharts={numberOfCharts}
                  onNumberOfChartsChange={setNumberOfCharts}
                  disabled={isUploading}
                />
              </div>

              <Separator />

              {/* Additional Details */}
              <div>
                <h3 className='text-lg font-semibold mb-4'>
                  Additional Context
                </h3>
                <AdditionalDetails
                  description={description}
                  onDescriptionChange={setDescription}
                  disabled={isUploading}
                />
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className='mt-6 space-y-4'>
                  <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-muted-foreground'>
                      Processing your file...
                    </span>
                    <span className='text-sm font-bold text-primary'>
                      {uploadProgress} %
                    </span>
                  </div>
                  <Progress value={uploadProgress} className='h-3' />
                  <p className='text-sm text-center text-muted-foreground'>
                    {uploadProgress < 100
                      ? "Analyzing your data and generating insights..."
                      : "Almost ready! Redirecting to your dashboard..."}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div className='flex justify-center pt-4'>
                <Button
                  onClick={handleUpload}
                  disabled={!isFormValid() || isUploading}
                  size='lg'
                  className='bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg font-semibold shadow-lg transition-all duration-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed'
                >
                  {isUploading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className='mr-2 h-5 w-5 border-2 border-white/30 border-t-white rounded-full'
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      Generate Dashboard
                      <ArrowRight className='h-5 w-5 ml-2' />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* What Happens Next Section */}
          <div className='mt-16'>
            <h2 className='text-3xl font-bold text-center mb-12 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              What Happens Next ?
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {nextSteps.map((step, index) => (
                <Card
                  key={index}
                  className='backdrop-blur-sm bg-white/50 dark:bg-slate-900/50 border-white/20 shadow-lg hover:shadow-xl transition-shadow duration-300'
                >
                  <CardHeader className='text-center'>
                    <div className='w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 mx-auto'>
                      <span className='text-white font-bold text-lg'>
                        {index + 1}
                      </span>
                    </div>
                    <CardTitle className='text-xl mb-2'>{step.title}</CardTitle>
                    <CardDescription className='text-base'>
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageBackground>
  );
}
