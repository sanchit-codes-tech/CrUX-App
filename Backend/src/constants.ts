export const AppConfig = {
  CRUX_BASE_URL:
    process.env.CHROME_CRUX_URL || "https://chromeuxreport.googleapis.com",
  ROUTES_BASE_URL: "/api/crux",
  MAX_URLS: 10,
  CORS: process.env.CORS_ORIGIN || "*",
};

export const AppValidationMessages = {
  INVALID_URL_FORMAT: "Invalid URL format. Must start with http:// or https://",
  DUPLICATE_URL: "This URL has already been added!",
  MAX_URLS_ALLOW: `Maximum ${AppConfig.MAX_URLS} URLs allowed!`,
  EMPTY_URL: "Please enter a URL!",
  URLS_MUST_BE_ARRAY: 'The "urls" field must be a list!',
  URL_OR_ORIGIN_REQUIRED: 'Either "url" or "origin" must be provided!',
  URL_ARR_REQUIRED: "Url's array is required and must not be empty!",
  NO_DATA: "No CrUX data available for this URL!",

  // CrUX API Errors
  API_ERROR: "Failed to fetch data. Please try again",
  NETWORK_ERROR: "Network error. Please check your connection",
  TIMEOUT_ERROR: "Request timeout. Please try again",
  SERVER_ERROR: "Internal server error!",

  // Success Messages
  SUCCESS_ANALYSIS: "Successfully analyzed URLs",
  URL_ADDED: "URL added successfully",
};

export const FETCH_METHODS = {
  GET: "GET",
  POST: "POST",
};

export const FORM_FACTOR = {
  PHONE: "PHONE",
  DESKTOP: "DESKTOP",
  TABLET: "TABLET",
};

export const METRICES = {
  LCP: "lcp",
  FID: "fid",
  CLS: "cls",
  FCP: "fcp",
  TTFB: "ttfb",
  INP: "INP",
};

export const PromiseSettledResultStatus = {
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
};

export const FormFactor = {
  PHONE: "PHONE",
  DESKTOP: "DESKTOP",
  TABLET: "TABLET",
};

export const Rating = {
  GOOD: "good",
  IMPRVMNT: "needs-improvement",
  POOR: "poor",
};

// Thresholds for Core Web Vitals
export const MetricThresholds = {
  lcp: { good: 2500, poor: 4000 },
  fid: { good: 100, poor: 300 },
  cls: { good: 0.1, poor: 0.25 },
  fcp: { good: 1800, poor: 3000 },
  ttfb: { good: 800, poor: 1800 },
  INP: { good: 200, poor: 500 },
};

export const MetricMapping = {
  largest_contentful_paint: METRICES.LCP,
  first_input_delay: METRICES.FID,
  cumulative_layout_shift: METRICES.CLS,
  first_contentful_paint: METRICES.FCP,
  experimental_time_to_first_byte: METRICES.TTFB,
  interaction_to_next_paint: METRICES.INP,
};
