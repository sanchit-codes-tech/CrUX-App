import { useState, useCallback, useRef } from "react";
import type {
  CruxBatchResponse,
  CruxResult,
  ToastInterface,
} from "../types/AppTypes";
import { useToast } from "./useToast";
import { ToastAlertColor } from "../constants/enums";
import ApiClient from "../services/ApiClient";
import { DEFAULT_FORM_FACTOR } from "../constants/config";
import { ValidationMessage } from "../constants/constants";
import { BATCH_ANALYSIS_API } from "../services/Endpoints";

interface UseCruxDataReturn {
  data: CruxResult[];
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast, showToast, hideToast } = useToast();
  const procesdItmRef = useRef(new Set());

  const fetchData = useCallback(
    async (urls: string[], formFactor: string = DEFAULT_FORM_FACTOR) => {
      const filteredUrls = urls.filter((item) => {
        if (procesdItmRef.current.has(item)) return false;
        else {
          procesdItmRef.current.add(item);
          return true;
        }
      });

      if (filteredUrls.length === 0) {
        showToast(ValidationMessage.URL_FETCHED, ToastAlertColor.INFO);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await ApiClient.get<CruxBatchResponse>(
          BATCH_ANALYSIS_API,
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
          showToast(
            `${ValidationMessage.URL_ANALYZE} ${response.data.count} URLs`,
            ToastAlertColor.SUCCESS
          );
        } else {
          throw new Error(ValidationMessage.FAILED_TO_FETCH);
        }
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : ValidationMessage.ERR_OCCURED;
        setError(errorMessage);
        setData([]);
        showToast(errorMessage, ToastAlertColor.ERROR);
      } finally {
        setLoading(false);
      }
    },
    [showToast]
  );

  const clearData = useCallback(() => {
    setData([]);
    setError(null);
    procesdItmRef.current.clear();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    data,
    loading,
    error,
    fetchData,
    clearData,
    clearError,
    hideToast,
    toast,
  };
};
