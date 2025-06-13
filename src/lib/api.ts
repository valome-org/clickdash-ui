// API base URL from environment variables
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// Helper function to handle API errors
export async function handleApiResponse(response: Response) {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || response.statusText || "API error";
    throw new Error(errorMessage);
  }
  return response.json();
}

// Common headers for API requests
export function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

// Define proper types for fetch options
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Generic fetch function with auth
export async function fetchWithAuth(
  url: string,
  token: string,
  options: FetchOptions = {}
) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...(options.headers || {}),
    },
  });
  return handleApiResponse(response);
}
