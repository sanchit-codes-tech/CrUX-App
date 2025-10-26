import type { AlertColor } from "@mui/material";
import type { FormFactor, Rating } from "../constants/enums";

export interface CruxAnalysisRequest {
  url?: string;
  origin?: string;
  formFactor?: FormFactor;
}

export interface Metric {
  value: number;
  rating: Rating;
}

export interface CruxMetrics {
  lcp: Metric;
  fid: Metric;
  cls: Metric;
  fcp: Metric;
  ttfb: Metric;
  inp: Metric;
}

export interface CruxResult {
  url: string;
  timestamp: string;
  formFactor?: string;
  metrics: CruxMetrics;
  error?: string;
}

export interface CruxSummary {
  [key: string]: {
    average: number;
    sum: number;
    min: number;
    max: number;
    median: number;
  };
}

export interface CruxAnalysisResponse {
  success: boolean;
  data: CruxResult;
  meta: {
    requestId: string;
    timestamp: string;
  };
}

export interface CruxBatchResponse {
  success: boolean;
  data: {
    results: CruxResult[];
    summary: CruxSummary;
    count: number;
  };
  meta: {
    requestId: string;
    timestamp: string;
    processingTime: string;
  };
}

export interface ToastInterface {
  open: boolean;
  message: string;
  severity: AlertColor;
  onClose?: () => void;
}
