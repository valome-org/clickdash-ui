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
import { ErrorAlert } from "@/components/ui/error-alert";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { PageBackground } from "@/components/ui/page-background";
import { PageHeader } from "@/components/ui/page-header";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  LineChart,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

// API base URL configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);

  // New form fields for enhanced generation
  const [category, setCategory] = useState<string>("");
  const [chartTypes, setChartTypes] = useState<string[]>([]);
  const [numberOfCharts, setNumberOfCharts] = useState<string>("3");
  const [description, setDescription] = useState<string>("");

  // Chart type options
  const chartTypeOptions = [
    { value: "bar", label: "Bar Chart" },
    { value: "line", label: "Line Chart" },
    { value: "pie", label: "Pie Chart" },
    { value: "scatter", label: "Scatter Plot" },
    { value: "area", label: "Area Chart" },
    { value: "doughnut", label: "Doughnut Chart" },
    { value: "radar", label: "Radar Chart" },
    { value: "heatmap", label: "Heatmap" },
  ];

  // Category options
  const categoryOptions = [
    { value: "finance", label: "Finance & Accounting" },
    { value: "sales", label: "Sales & Marketing" },
    { value: "operations", label: "Operations & Logistics" },
    { value: "hr", label: "Human Resources" },
    { value: "product", label: "Product & Inventory" },
    { value: "customer", label: "Customer Data" },
    { value: "research", label: "Research & Development" },
    { value: "other", label: "Other" },
  ];

  const { user, token, logout } = useAuth();
  const router = useRouter();

  const handleFileValidationError = (message: string) => {
    setError(message);
  };

  const toggleChartType = (type: string) => {
    if (chartTypes.includes(type)) {
      setChartTypes(chartTypes.filter((t) => t !== type));
    } else {
      setChartTypes([...chartTypes, type]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setError(null);

    // Simulate progress for better UX
    let progress = 0;
    const progressInterval = setInterval(() => {
      progress += Math.random() * 10;
      if (progress > 90) progress = 90;
      setUploadProgress(Math.round(progress));
    }, 300);

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Add the enhanced generation options
      formData.append("category", category);
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

  const nextStep = () => {
    setActiveStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  // Check if the current step is valid
  const isStepValid = () => {
    switch (activeStep) {
      case 0:
        return !!file;
      case 1:
        return !!category;
      case 2:
        return chartTypes.length > 0 && !!numberOfCharts;
      case 3:
        return true; // Description is optional
      default:
        return false;
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
      <div className='py-12'>
        <PageHeader
          badge='Excel to Dashboard'
          title='Create Interactive Dashboard'
          description='Upload your Excel file and get AI-powered visualizations in seconds'
        />

        <div className='max-w-3xl mx-auto'>
          <Card className='backdrop-blur-xl bg-white/70 dark:bg-slate-900/70 border-white/20 shadow-2xl overflow-hidden'>
            {/* Multi-step form header */}
            <div className='px-6 pt-6 mx-auto'>
              <div className='flex items-center justify-between mb-4'>
                <div className='flex items-center space-x-2'>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      activeStep >= 0
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {activeStep > 0 ? <Check className='h-4 w-4' /> : "1"}
                  </div>
                  <div
                    className={cn(
                      "h-1 w-8",
                      activeStep >= 1 ? "bg-blue-600" : "bg-gray-200"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      activeStep >= 1
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {activeStep > 1 ? <Check className='h-4 w-4' /> : "2"}
                  </div>
                  <div
                    className={cn(
                      "h-1 w-8",
                      activeStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      activeStep >= 2
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {activeStep > 2 ? <Check className='h-4 w-4' /> : "3"}
                  </div>
                  <div
                    className={cn(
                      "h-1 w-8",
                      activeStep >= 3 ? "bg-blue-600" : "bg-gray-200"
                    )}
                  ></div>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      activeStep >= 3
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    )}
                  >
                    {activeStep > 3 ? <Check className='h-4 w-4' /> : "4"}
                  </div>
                </div>
              </div>

              <div className='text-sm text-muted-foreground'>
                Step {activeStep + 1} of 4:
                {activeStep === 0 && " Upload your Excel file"}
                {activeStep === 1 && " Select data category"}
                {activeStep === 2 && " Choose visualization options"}
                {activeStep === 3 && " Add details & generate"}
              </div>
            </div>

            <CardContent className='p-6'>
              {error && <ErrorAlert message={error} />}

              {/* Step 1: File Upload */}
              {activeStep === 0 && (
                <div>
                  <CardHeader className='text-center px-0 pt-0'>
                    <CardTitle className='text-xl font-bold text-blue-700'>
                      Upload Your Excel File
                    </CardTitle>
                    <CardDescription>
                      Select an Excel file to analyze and visualize
                    </CardDescription>
                  </CardHeader>

                  <FileUpload
                    onChange={setFile}
                    file={file}
                    disabled={isUploading}
                    onValidationError={handleFileValidationError}
                  />
                </div>
              )}

              {/* Step 2: Data Category */}
              {activeStep === 1 && (
                <div>
                  <CardHeader className='text-center px-0 pt-0'>
                    <CardTitle className='text-xl font-bold text-blue-700'>
                      Select Data Category
                    </CardTitle>
                    <CardDescription>
                      Help us understand what type of data you are analyzing
                    </CardDescription>
                  </CardHeader>

                  <div className='space-y-4'>
                    <Select value={category} onValueChange={setCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select a category' />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {category === "other" && (
                      <div className='mt-4'>
                        <Label htmlFor='custom-category'>
                          Specify Category
                        </Label>
                        <Input
                          id='custom-category'
                          placeholder='Describe your data category'
                          className='mt-1'
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Visualization Options */}
              {activeStep === 2 && (
                <div>
                  <CardHeader className='text-center px-0 pt-0'>
                    <CardTitle className='text-xl font-bold text-blue-700'>
                      Choose Visualization Options
                    </CardTitle>
                    <CardDescription>
                      Select chart types and how many charts to generate
                    </CardDescription>
                  </CardHeader>

                  <div className='space-y-6'>
                    <div>
                      <Label className='text-base font-medium mb-2 block'>
                        Chart Types (select multiple)
                      </Label>
                      <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                        {chartTypeOptions.map((option) => (
                          <Button
                            key={option.value}
                            type='button'
                            variant={
                              chartTypes.includes(option.value)
                                ? "default"
                                : "outline"
                            }
                            className='justify-start'
                            onClick={() => toggleChartType(option.value)}
                          >
                            <LineChart className='h-4 w-4 mr-2' />
                            {option.label}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className='text-base font-medium mb-2 block'>
                        Number of Charts
                      </Label>
                      <RadioGroup
                        value={numberOfCharts}
                        onValueChange={setNumberOfCharts}
                        className='grid grid-cols-3 gap-2'
                      >
                        <div>
                          <RadioGroupItem
                            value='3'
                            id='charts-3'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='charts-3'
                            className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            <span>3</span>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem
                            value='4'
                            id='charts-4'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='charts-4'
                            className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            <span>4</span>
                          </Label>
                        </div>

                        <div>
                          <RadioGroupItem
                            value='5'
                            id='charts-5'
                            className='peer sr-only'
                          />
                          <Label
                            htmlFor='charts-5'
                            className='flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary'
                          >
                            <span>5</span>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Details */}
              {activeStep === 3 && (
                <div>
                  <CardHeader className='text-center px-0 pt-0'>
                    <CardTitle className='text-xl font-bold text-blue-700'>
                      Additional Details
                    </CardTitle>
                    <CardDescription>
                      Provide more context about your data to improve results
                      (optional)
                    </CardDescription>
                  </CardHeader>

                  <div className='space-y-4'>
                    <Label htmlFor='description'>Data Description</Label>
                    <Textarea
                      id='description'
                      placeholder="Describe what your data represents, what insights you're looking for, or any specific aspects you want to highlight..."
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {isUploading && (
                <div className='mt-4'>
                  <Progress value={uploadProgress} className='h-2' />
                  <p className='text-xs text-center mt-2 text-muted-foreground'>
                    {uploadProgress < 100
                      ? `Processing... ${uploadProgress}%`
                      : "Redirecting to dashboard..."}
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className='flex justify-between p-6 pt-0'>
              {activeStep > 0 && (
                <Button
                  variant='outline'
                  onClick={prevStep}
                  disabled={isUploading}
                >
                  <ChevronLeft className='h-4 w-4 mr-2' />
                  Back
                </Button>
              )}

              {activeStep < 3 ? (
                <Button
                  onClick={nextStep}
                  disabled={!isStepValid() || isUploading}
                  className={activeStep === 0 ? "ml-auto" : ""}
                >
                  Next
                  <ChevronRight className='h-4 w-4 ml-2' />
                </Button>
              ) : (
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  className='ml-auto'
                >
                  Generate Dashboard
                  <ArrowRight className='h-4 w-4 ml-2' />
                </Button>
              )}
            </CardFooter>
          </Card>

          <div className='mt-12'>
            <h2 className='text-2xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              What Happens Next?
            </h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              {steps.map((step, index) => (
                <Card
                  key={index}
                  className='backdrop-blur-sm bg-white/50 border-white/20 shadow-lg'
                >
                  <CardHeader>
                    <div className='w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mb-2'>
                      <span className='text-blue-700 dark:text-blue-300 font-bold'>
                        {index + 1}
                      </span>
                    </div>
                    <CardTitle className='text-lg'>{step.title}</CardTitle>
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
