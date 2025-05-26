"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdCheckCircle, MdError, MdTableChart, MdUpload } from "react-icons/md";

interface UploadStatus {
  status: "idle" | "uploading" | "processing" | "success" | "error";
  progress: number;
  message: string;
  dashboardId?: string;
}

// Simple className utility to replace clsx
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function HomePage() {
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({
    status: "idle",
    progress: 0,
    message: "",
  });

  const uploadFile = async (file: File) => {
    setUploadStatus({
      status: "uploading",
      progress: 0,
      message: "Uploading file...",
    });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      setUploadStatus({
        status: "processing",
        progress: 50,
        message: "Processing Excel file...",
      });

      const result = await response.json();

      if (result.status === "success") {
        setUploadStatus({
          status: "success",
          progress: 100,
          message: "Dashboard created successfully!",
          dashboardId: result.dashboard_id,
        });
      } else {
        throw new Error(result.message || "Processing failed");
      }
    } catch (error) {
      setUploadStatus({
        status: "error",
        progress: 0,
        message: error instanceof Error ? error.message : "Upload failed",
      });
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      uploadFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
    },
    maxFiles: 1,
    disabled:
      uploadStatus.status === "uploading" ||
      uploadStatus.status === "processing",
  });

  const resetUpload = () => {
    setUploadStatus({
      status: "idle",
      progress: 0,
      message: "",
    });
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4'>
      <div className='w-full max-w-2xl'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Excel to Dashboard AI
          </h1>
          <p className='text-lg text-gray-600'>
            Upload your Excel file and get an interactive dashboard in seconds
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-xl p-8'>
          {uploadStatus.status === "idle" && (
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-200",
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
              )}
            >
              <input {...getInputProps()} />
              <MdUpload className='w-16 h-16 text-gray-400 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                Drop your Excel file here
              </h3>
              <p className='text-gray-500 mb-4'>or click to browse files</p>
              <p className='text-sm text-gray-400'>
                Supports .xlsx and .xls files up to 10MB
              </p>
            </div>
          )}

          {(uploadStatus.status === "uploading" ||
            uploadStatus.status === "processing") && (
            <div className='text-center p-12'>
              <AiOutlineLoading3Quarters className='w-16 h-16 text-blue-500 mx-auto mb-4 animate-spin' />
              <h3 className='text-xl font-semibold text-gray-700 mb-4'>
                {uploadStatus.message}
              </h3>
              <div className='w-full bg-gray-200 rounded-full h-3 mb-4'>
                <div
                  className='bg-blue-500 h-3 rounded-full transition-all duration-300'
                  style={{ width: `${uploadStatus.progress}%` }}
                ></div>
              </div>
              <p className='text-gray-500 text-sm'>
                {uploadStatus.progress}% complete
              </p>
            </div>
          )}

          {uploadStatus.status === "success" && (
            <div className='text-center p-12'>
              <MdCheckCircle className='w-16 h-16 text-green-500 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-700 mb-4'>
                {uploadStatus.message}
              </h3>
              <div className='space-y-4'>
                <button
                  onClick={() =>
                    window.open(
                      `/dashboard/${uploadStatus.dashboardId}`,
                      "_blank"
                    )
                  }
                  className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
                >
                  View Dashboard
                </button>
                <button
                  onClick={resetUpload}
                  className='w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-colors'
                >
                  Upload Another File
                </button>
              </div>
            </div>
          )}

          {uploadStatus.status === "error" && (
            <div className='text-center p-12'>
              <MdError className='w-16 h-16 text-red-500 mx-auto mb-4' />
              <h3 className='text-xl font-semibold text-gray-700 mb-4'>
                Upload Failed
              </h3>
              <p className='text-red-600 mb-6'>{uploadStatus.message}</p>
              <button
                onClick={resetUpload}
                className='w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors'
              >
                Try Again
              </button>
            </div>
          )}
        </div>

        <div className='mt-8 text-center'>
          <div className='flex items-center justify-center space-x-6 text-sm text-gray-500'>
            <div className='flex items-center space-x-2'>
              <MdTableChart className='w-4 h-4' />
              <span>Excel Support</span>
            </div>
            <div className='flex items-center space-x-2'>
              <MdCheckCircle className='w-4 h-4' />
              <span>AI Analysis</span>
            </div>
            <div className='flex items-center space-x-2'>
              <MdUpload className='w-4 h-4' />
              <span>Instant Dashboards</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
