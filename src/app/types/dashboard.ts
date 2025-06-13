export interface KeyMetric {
  metric: string;
  value: string;
  description?: string;
}

export interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    borderWidth?: number;
    tension?: number;
  }>;
}

export interface ChartConfig {
  chart_type: string;
  title: string;
  x_axis: string;
  y_axis: string;
  data: ChartData;
  insights?: string;
  color_scheme?: string;
  data_config?: {
    source_columns?: string[];
    aggregation?: string;
    limit?: number;
    sort?: string;
  };
  metadata?: {
    importance?: string;
    relevant_business_kpis?: string[];
    recommended_actions?: string[];
    [key: string]: string | string[] | number | boolean | undefined;
  };
  interactive_features?: string[];
}

export interface DashboardConfig {
  title: string;
  charts: ChartConfig[];
  insights: string;
  summary: string;
  key_metrics: KeyMetric[];
  category?: string;
  metadata?: {
    data_quality_score?: string;
    analysis_confidence?: string;
    recommended_refresh_frequency?: string;
    key_factors?: string[];
    potential_use_cases?: string[];
    [key: string]: string | string[] | number | boolean | undefined;
  };
}

export interface DashboardData {
  dashboard_id: string;
  dashboard_config: DashboardConfig;
  status: string;
  message?: string;
}
