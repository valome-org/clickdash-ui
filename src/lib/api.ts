// API base URL from environment variables
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// ===== TYPES =====
export interface User {
  user_id: string;
  email: string;
  username: string;
  full_name?: string;
  is_active: boolean;
  is_admin: boolean;
  created_at: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  username: string;
  full_name?: string;
  password: string;
}

export interface UploadRequest {
  file: File;
  category: string;
  chart_types: string[];
  number_of_charts: string;
  description: string;
}

export interface UploadResponse {
  status: string;
  dashboard_id: string;
  dashboard_config: any;
  message: string;
}

export interface DashboardListResponse {
  dashboards: Array<{
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
  }>;
}

export interface DashboardResponse {
  dashboard_id: string;
  dashboard_config: any;
  status: string;
  message?: string;
}

// ===== UTILITY FUNCTIONS =====
export class ApiError extends Error {
  constructor(message: string, public status?: number, public response?: Response) {
    super(message);
    this.name = 'ApiError';
  }
}

// Helper function to handle API errors
export async function handleApiResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const errorMessage = errorData.detail || errorData.message || errorData.error || response.statusText || "API error";
    throw new ApiError(errorMessage, response.status, response);
  }
  return response.json();
}

// Common headers for API requests
export function getAuthHeaders(token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// Get form data headers for file uploads
export function getFormDataAuthHeaders(token?: string) {
  const headers: Record<string, string> = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

// Define proper types for fetch options
interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

// Generic fetch function with auth
export async function fetchWithAuth<T>(
  url: string,
  token?: string,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getAuthHeaders(token),
      ...(options.headers || {}),
    },
  });
  return handleApiResponse<T>(response);
}

// Generic fetch function for form data with auth
export async function fetchFormDataWithAuth<T>(
  url: string,
  token?: string,
  options: FetchOptions = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...getFormDataAuthHeaders(token),
      ...(options.headers || {}),
    },
  });
  return handleApiResponse<T>(response);
}

// ===== API SERVICE CLASS =====
export class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  // ===== AUTHENTICATION ENDPOINTS =====
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    return fetchWithAuth<LoginResponse>(`${this.baseUrl}/api/auth/login`, undefined, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    return fetchWithAuth<LoginResponse>(`${this.baseUrl}/api/auth/register`, undefined, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async validateToken(token: string): Promise<User> {
    return fetchWithAuth<User>(`${this.baseUrl}/api/auth/me`, token, {
      method: "GET",
    });
  }

  // ===== DASHBOARD ENDPOINTS =====
  async getDashboards(token: string): Promise<DashboardListResponse> {
    return fetchWithAuth<DashboardListResponse>(`${this.baseUrl}/api/dashboards/my`, token, {
      method: "GET",
    });
  }

  async getDashboard(dashboardId: string, token: string): Promise<DashboardResponse> {
    return fetchWithAuth<DashboardResponse>(`${this.baseUrl}/api/dashboard/${dashboardId}`, token, {
      method: "GET",
    });
  }

  async deleteDashboard(dashboardId: string, token: string): Promise<void> {
    return fetchWithAuth<void>(`${this.baseUrl}/api/dashboard/${dashboardId}`, token, {
      method: "DELETE",
    });
  }

  // ===== UPLOAD ENDPOINTS =====
  async uploadFile(uploadData: UploadRequest, token: string): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append("file", uploadData.file);
    formData.append("category", uploadData.category);
    formData.append("chart_types", uploadData.chart_types.join(","));
    formData.append("number_of_charts", uploadData.number_of_charts);
    formData.append("description", uploadData.description);

    return fetchFormDataWithAuth<UploadResponse>(`${this.baseUrl}/api/upload`, token, {
      method: "POST",
      body: formData,
    });
  }

  // ===== GENERIC METHODS =====
  async get<T>(endpoint: string, token?: string): Promise<T> {
    return fetchWithAuth<T>(`${this.baseUrl}${endpoint}`, token, {
      method: "GET",
    });
  }

  async post<T>(endpoint: string, data: any, token?: string): Promise<T> {
    return fetchWithAuth<T>(`${this.baseUrl}${endpoint}`, token, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any, token?: string): Promise<T> {
    return fetchWithAuth<T>(`${this.baseUrl}${endpoint}`, token, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string, token?: string): Promise<T> {
    return fetchWithAuth<T>(`${this.baseUrl}${endpoint}`, token, {
      method: "DELETE",
    });
  }

  async postFormData<T>(endpoint: string, formData: FormData, token?: string): Promise<T> {
    return fetchFormDataWithAuth<T>(`${this.baseUrl}${endpoint}`, token, {
      method: "POST",
      body: formData,
    });
  }
}

// ===== SINGLETON INSTANCE =====
export const apiService = new ApiService();

// ===== CONVENIENCE FUNCTIONS =====
// Export individual API functions for easier migration
export const authApi = {
  login: (credentials: LoginRequest) => apiService.login(credentials),
  register: (userData: RegisterRequest) => apiService.register(userData),
  validateToken: (token: string) => apiService.validateToken(token),
};

export const dashboardApi = {
  getDashboards: (token: string) => apiService.getDashboards(token),
  getDashboard: (dashboardId: string, token: string) => apiService.getDashboard(dashboardId, token),
  deleteDashboard: (dashboardId: string, token: string) => apiService.deleteDashboard(dashboardId, token),
};

export const uploadApi = {
  uploadFile: (uploadData: UploadRequest, token: string) => apiService.uploadFile(uploadData, token),
};

// ===== ENDPOINTS CONSTANTS =====
export const ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REGISTER: "/api/auth/register",
    ME: "/api/auth/me",
  },
  DASHBOARDS: {
    MY_DASHBOARDS: "/api/dashboards/my",
    DASHBOARD: "/api/dashboard",
  },
  UPLOAD: {
    UPLOAD_FILE: "/api/upload",
  },
} as const;
