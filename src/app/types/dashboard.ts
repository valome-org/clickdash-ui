export interface ChartConfig {
  title: string;
  chart_type: string;
  x_axis?: string;
  y_axis?: string;
  insights?: string;
  data?: {
    labels?: string[];
    datasets?: {
      label?: string;
      data?: number[];
    }[];
  };
}

export interface KeyMetric {
  metric: string;
  value: string;
  description: string;
}

export interface DashboardConfig {
  title: string;
  charts: ChartConfig[];
  insights: string;
  summary: string;
  key_metrics: KeyMetric[];
}

export interface DashboardData {
  dashboard_id: string;
  dashboard_config: DashboardConfig;
  status: string;
  message?: string;
}
