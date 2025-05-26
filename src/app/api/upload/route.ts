import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ACCEPTED_FILE_TYPES = [
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
  "application/vnd.ms-excel", // .xls
];

// Validation schema
const uploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      "File size must be less than 10MB"
    )
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "File must be an Excel file (.xlsx or .xls)"
    ),
});

export async function POST(request: NextRequest) {
  try {
    // Parse the form data
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate the file
    const validation = uploadSchema.safeParse({ file });
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    // Forward the file to the Python FastAPI backend
    const backendUrl =
      process.env.PYTHON_SERVICE_URL || "http://localhost:8000";
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    const response = await fetch(`${backendUrl}/upload`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      return NextResponse.json(
        {
          error: "Processing failed",
          details: errorData?.detail || response.statusText,
        },
        { status: response.status }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      status: "success",
      dashboard_id: result.dashboard_id,
      dashboard_config: result.dashboard_config,
      message: "File uploaded and processed successfully",
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      {
        error: "Internal server error",
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Upload endpoint. Use POST to upload files.",
    accepted_types: ACCEPTED_FILE_TYPES,
    max_size: `${MAX_FILE_SIZE / (1024 * 1024)}MB`,
  });
}
