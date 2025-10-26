import { useState, useCallback, useRef } from "react";
import type {
  CruxBatchResponse,
  CruxResult,
  CruxSummary,
  ToastInterface,
} from "../types/AppTypes";
import { useToast } from "./useToast";
import { ToastAlertColor } from "../constants/enums";
import ApiClient from "../services/ApiClient";

interface UseCruxDataReturn {
  data: CruxResult[];
  summary: CruxSummary | null;
  loading: boolean;
  error: string | null;
  fetchData: (urls: string[], formFactor?: string) => Promise<void>;
  clearData: () => void;
  clearError: () => void;
  toast: ToastInterface;
  hideToast: () => void;
}

export const useCruxData = (): UseCruxDataReturn => {
  const [data, setData] = useState<CruxResult[]>([]);
  const [summary, setSummary] = useState<CruxSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();
  const procesdItmRef = useRef(new Set());

  const fetchData = useCallback(
    async (urls: string[], formFactor: string = "DESKTOP") => {
      const filteredUrls = urls.filter((item) => {
        if (procesdItmRef.current.has(item)) return false;
        else {
          procesdItmRef.current.add(item);
          return true;
        }
      });
      console.log(filteredUrls, "filteredUrls");
      if (filteredUrls.length === 0) {
        showToast(
          `URLs data already fetched. Please add new URLs to fetch data.`,
          ToastAlertColor.INFO
        );
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.get<CruxBatchResponse>(
          `/batch-analyze`,
          {
            params: {
              urls: JSON.stringify(filteredUrls),
              formFactor,
            },
          }
        );

        if (response.success) {
          setData((prev) => {
            if (prev.length) {
              return [...prev, ...response.data.results];
            } else return response.data.results;
          });
          setSummary(response.data.summary);
          showToast(
            `Successfully analyzed ${response.data.count} URLs`,
            ToastAlertColor.SUCCESS
          );
        } else {
          throw new Error("Failed to fetch data");
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : "An error occurred while fetching data";
        setError(errorMessage);
        setData([]);
        setSummary(null);
        showToast(errorMessage, ToastAlertColor.ERROR);
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  const clearData = useCallback(() => {
    setData([]);
    setSummary(null);
    setError(null);
    procesdItmRef.current.clear();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  console.log(data, "here are data");

  return {
    data,
    summary,
    loading,
    error,
    fetchData,
    clearData,
    clearError,
    hideToast,
    toast,
  };
};
