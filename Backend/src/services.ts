import {
  AppValidationMessages,
  FORM_FACTOR,
  MetricMapping,
  MetricThresholds,
  Rating,
} from "./constants.ts";
import CruxApiClient from "./service/apiClient.ts";

interface IFormFactor {
  PHONE: "PHONE";
  DESKTOP: "DESKTOP";
  TABLET: "TABLET";
}

interface CruxQueryParams {
  url?: string;
  origin?: string;
  formFactor?: IFormFactor | string;
}

interface ProcessedMetric {
  value: number;
  rating: string;
}

interface ProcessedResult {
  url: string;
  timestamp: string;
  formFactor?: string;
  metrics: {
    lcp: ProcessedMetric;
    fid: ProcessedMetric;
    cls: ProcessedMetric;
    fcp: ProcessedMetric;
    ttfb: ProcessedMetric;
    INP: ProcessedMetric;
  };
  raw?: any;
}

class CruxService {
  async fetchCruxData(params: CruxQueryParams): Promise<ProcessedResult> {
    const { url, origin, formFactor = FORM_FACTOR.DESKTOP } = params;

    // Validate input
    if (!url && !origin) {
      throw new Error(AppValidationMessages.URL_OR_ORIGIN_REQUIRED);
    }

    try {
      const payload: any = { formFactor };
      if (url) payload.url = url;
      if (origin) payload.origin = origin;

      const rawData = await CruxApiClient.queryRecord(payload);

      if (!rawData.record) {
        throw new Error(AppValidationMessages.NO_DATA);
      }

      const processed = this.processRawData(
        rawData,
        url || origin!,
        formFactor
      );

      return processed;
    } catch (error: any) {
      throw error;
    }
  }

  async fetchMultipleUrls(
    urls: string[],
    formFactor: string = FORM_FACTOR.PHONE
  ): Promise<ProcessedResult[]> {
    const results = await Promise.allSettled(
      urls.map((url) =>
        this.fetchCruxData({ url, formFactor: formFactor as any })
      )
    );

    return results.map((result, index) => {
      if (result.status === "fulfilled") {
        return result.value;
      } else {
        return {
          url: urls[index],
          timestamp: new Date().toISOString(),
          error: result.reason.message,
          metrics: this.getEmptyMetrics(),
        } as any;
      }
    });
  }

  private processRawData(
    rawData: any,
    identifier: string,
    formFactor: string | IFormFactor
  ): ProcessedResult {
    const metrics = rawData.record.metrics;
    const processed: any = {
      url: identifier,
      timestamp: new Date().toISOString(),
      formFactor,
      metrics: {},
      raw: rawData,
    };

    Object.entries(MetricMapping).forEach(([cruxKey, shortKey]) => {
      if (metrics[cruxKey]) {
        const p75Value = metrics[cruxKey].percentiles?.p75 || 0;
        processed.metrics[shortKey] = {
          value: p75Value,
          rating: this.getRating(shortKey as any, p75Value),
        };
      }
    });

    return processed;
  }

  private getRating(
    metric: keyof typeof MetricThresholds,
    value: number
  ): string {
    const threshold = MetricThresholds[metric];
    if (value <= threshold.good) return Rating["GOOD"];
    if (value <= threshold.poor) return Rating["IMPRVMNT"];
    return Rating["POOR"];
  }

  private getEmptyMetrics(): any {
    const empty: any = {};
    Object.values(MetricMapping).forEach((key) => {
      empty[key] = { value: 0, rating: Rating.POOR };
    });
    return empty;
  }
}

export default new CruxService();
