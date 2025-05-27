"use client";

import { useAuth } from "@/app/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Validate file type
      const allowedTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
      ];

      if (!allowedTypes.includes(selectedFile.type)) {
        setError("Please select a valid Excel file (.xlsx, .xls) or CSV file");
        return;
      }

      // Validate file size (10MB limit)
      if (selectedFile.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setFile(selectedFile);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !token) return;

    setIsUploading(true);
    setUploadProgress(0);
    setError(null);

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

      // Redirect to the new dashboard
      router.push(`/dashboard/${data.dashboard_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  if (!user) {
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
                Create Dashboard
              </h1>
              <p className='text-gray-600 mt-2'>
                Upload your Excel file to generate an AI-powered dashboard
              </p>
            </div>
            <div className='mt-4 md:mt-0 flex space-x-4'>
              <Link
                href='/dashboard/history'
                className='bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200'
              >
                View History
              </Link>
              <button
                onClick={logout}
                className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200'
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className='max-w-2xl mx-auto'>
          <div className='bg-white rounded-2xl shadow-xl p-8'>
            <div className='text-center mb-8'>
              <div className='text-6xl mb-4'>📊</div>
              <h2 className='text-2xl font-bold text-gray-900 mb-2'>
                Upload Your Excel File
              </h2>
              <p className='text-gray-600'>
                Our AI will analyze your data and create beautiful, interactive
                dashboards
              </p>
            </div>

            {error && (
              <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6'>
                {error}
              </div>
            )}

            <div className='space-y-6'>
              {/* File Upload */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Select Excel File
                </label>
                <div className='border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200'>
                  <input
                    type='file'
                    accept='.xlsx,.xls,.csv'
                    onChange={handleFileChange}
                    className='hidden'
                    id='file-upload'
                    disabled={isUploading}
                  />
                  <label
                    htmlFor='file-upload'
                    className='cursor-pointer flex flex-col items-center'
                  >
                    <div className='text-4xl mb-2'>📁</div>
                    <div className='text-lg font-medium text-gray-900 mb-1'>
                      Click to upload or drag and drop
                    </div>
                    <div className='text-sm text-gray-500'>
                      Excel files (.xlsx, .xls) or CSV files up to 10MB
                    </div>
                  </label>
                </div>

                {file && (
                  <div className='mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg'>
                    <div className='flex items-center justify-between'>
                      <div>
                        <div className='font-medium text-blue-900'>
                          {file.name}
                        </div>
                        <div className='text-sm text-blue-700'>
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                      <button
                        onClick={() => setFile(null)}
                        className='text-blue-600 hover:text-blue-800'
                        disabled={isUploading}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Upload Progress */}
              {isUploading && (
                <div className='space-y-2'>
                  <div className='flex justify-between text-sm'>
                    <span>Processing...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className='w-full bg-gray-200 rounded-full h-2'>
                    <div
                      className='bg-blue-600 h-2 rounded-full transition-all duration-300'
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <div className='text-sm text-gray-600 text-center'>
                    Our AI is analyzing your data and creating your dashboard...
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <button
                onClick={handleUpload}
                disabled={!file || isUploading}
                className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200'
              >
                {isUploading ? (
                  <div className='flex items-center justify-center'>
                    <div className='animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2'></div>
                    Creating Dashboard...
                  </div>
                ) : (
                  "Create Dashboard"
                )}
              </button>
            </div>

            {/* Info Section */}
            <div className='mt-8 border-t border-gray-200 pt-8'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                What happens next?
              </h3>
              <div className='space-y-3 text-sm text-gray-600'>
                <div className='flex items-start'>
                  <div className='text-blue-600 mr-3'>1.</div>
                  <div>Your Excel file is securely uploaded and analyzed</div>
                </div>
                <div className='flex items-start'>
                  <div className='text-blue-600 mr-3'>2.</div>
                  <div>
                    Our AI identifies patterns and creates relevant
                    visualizations
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='text-blue-600 mr-3'>3.</div>
                  <div>
                    You get an interactive dashboard with insights and charts
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
