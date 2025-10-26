import { Rating } from "../../constants/enums";

export const formatMetricValue = (metric: string, value: number): string => {
  // Handle null, undefined, or non-numeric values
  if (value == null) return metric === "cls" ? "0.000" : "0ms";

  const numValue = Number(value);

  // Handle NaN or invalid numbers
  if (isNaN(numValue)) return metric === "cls" ? "0.000" : "0ms";

  // Format CLS values
  if (metric === "cls") {
    return numValue.toFixed(3);
  }

  // Format time-based metrics
  return `${Math.round(numValue)}ms`;
};

export const getMetricDescription = (metric: string): string => {
  const descriptions: Record<string, string> = {
    lcp: "Largest Contentful Paint - measures loading performance. Good: ≤2.5s",
    fid: "First Input Delay - measures interactivity. Good: ≤100ms",
    cls: "Cumulative Layout Shift - measures visual stability. Good: ≤0.1",
    fcp: "First Contentful Paint - measures perceived load speed. Good: ≤1.8s",
    ttfb: "Time to First Byte - measures server responsiveness. Good: ≤800ms",
    inp: "Interaction to Next Paint - measures responsiveness. Good: ≤200ms",
  };
  return descriptions[metric] || metric.toUpperCase();
};

export const formatTimestamp = (timestamp: string): string => {
  return new Date(timestamp).toLocaleString();
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat().format(num);
};

export const getRatingColor = (rating: string) => {
  switch (rating) {
    case Rating.good:
      return "success";
    case Rating.imprv:
      return "warning";
    case Rating.poor:
      return "error";
    default:
      return "default";
  }
};
