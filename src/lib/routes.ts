// Centralized route configuration for the application
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboards',
  UPLOAD: '/upload',
  DASHBOARD_DETAIL: (id: string) => `/dashboards/${id}`,
} as const;

// Type for route keys
export type RouteKey = keyof typeof ROUTES;

// Helper function to get route with parameters
export const getRoute = {
  home: () => ROUTES.HOME,
  login: () => ROUTES.LOGIN,
  register: () => ROUTES.REGISTER,
  dashboard: () => ROUTES.DASHBOARD,
  upload: () => ROUTES.UPLOAD,
  dashboardDetail: (id: string) => ROUTES.DASHBOARD_DETAIL(id),
} as const;

// Navigation utilities
export const navigation = {
  goToDashboard: () => ROUTES.DASHBOARD,
  goToLogin: () => ROUTES.LOGIN,
  goToUpload: () => ROUTES.UPLOAD,
  goToDashboardDetail: (id: string) => ROUTES.DASHBOARD_DETAIL(id),
} as const;
