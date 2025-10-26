import type { Column } from "../components/Table";
import type { CruxResult } from "../types/AppTypes";

export const FORM_FACTORS = {
  PHONE: "PHONE",
  DESKTOP: "DESKTOP",
  TABLET: "TABLET",
} as const;

export const MAX_URLS = 10;
export const DEFAULT_FORM_FACTOR = FORM_FACTORS.DESKTOP;

export const API_BASE_URL =
  import.meta.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api/crux/";

export const environment = import.meta.env.REACT_APP_ENV || "development";

export const METRIC_THRESHOLDS = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 },
  inp: { good: 200, poor: 500 },
} as const;

export const METRIC_LABELS = {
  lcp: "Largest Contentful Paint",
  fid: "First Input Delay",
  cls: "Cumulative Layout Shift",
  fcp: "First Contentful Paint",
  ttfb: "Time to First Byte",
  inp: "Interaction to Next Paint",
} as const;

export const ColumnsConfig: Column<CruxResult>[] = [
  {
    id: "url",
    label: "URL",
    sortable: true,
  },
  {
    id: "lcp",
    label: "LCP",
    sortable: true,
  },
  {
    id: "fid",
    label: "FID",
    sortable: true,
  },
  {
    id: "cls",
    label: "CLS",
    sortable: true,
  },
  {
    id: "fcp",
    label: "FCP",
    sortable: true,
  },
  {
    id: "ttfb",
    label: "TTFB",
    sortable: true,
  },
  {
    id: "inp",
    label: "INP",
    sortable: true,
  },
];
