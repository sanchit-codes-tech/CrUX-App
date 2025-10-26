import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  AxiosError,
  type AxiosResponse,
} from "axios";
import { API_BASE_URL } from "../constants/config";

class ApiClient {
  private client: AxiosInstance;
  private requestQueue: Map<string, AbortController> = new Map();

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        return this.handleError(error);
      }
    );
  }

  private handleError(error: AxiosError): Promise<never> {
    let errorMessage = "An unexpected error occurred";

    if (error.response) {
      // Server responded with error
      const status = error.response.status;
      const data = error.response.data as Error;

      switch (status) {
        case 400:
          errorMessage =
            data?.message || "Invalid request. Please check your input.";
          break;
        case 401:
          errorMessage = "Unauthorized. Please login again.";
          break;
        case 403:
          errorMessage = "Access forbidden.";
          break;
        case 404:
          errorMessage = "Resource not found.";
          break;
        case 429:
          errorMessage = "Too many requests. Please try again later.";
          break;
        case 500:
        case 502:
        case 503:
        case 504:
          errorMessage = "Server error. Please try again later.";
          break;
        default:
          errorMessage = data?.message || "An error occurred";
      }
    } else if (error.request) {
      // No response received
      if (error.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please try again.";
      } else {
        errorMessage = "Network error. Please check your connection.";
      }
    } else {
      errorMessage = error.message || "Request failed";
    }

    console.error("[API Error]", errorMessage, error);
    return Promise.reject(new Error(errorMessage));
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  async post<T, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  // Cancel specific request
  cancelRequest(requestId: string): void {
    const controller = this.requestQueue.get(requestId);
    if (controller) {
      controller.abort();
      this.requestQueue.delete(requestId);
    }
  }
}

export default new ApiClient();
