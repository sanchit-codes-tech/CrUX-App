import { AppConfig, FETCH_METHODS } from "../constants.ts";
import { endPoints } from "./endpoints.ts";

class CruxApiClient {
  private async request(endpoint: string, options: RequestInit): Promise<any> {
    const url = new URL(endpoint, "https://chromeuxreport.googleapis.com");

    // Attach API key as query param
    url.searchParams.set("key", process.env.CHROME_CRUX_API_KEY || "");

    // Default headers
    const headers = {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    };

    try {
      // Perform fetch
      const response = await fetch(url.href, {
        ...options,
        headers,
      });

      if (!response.ok) {
        return this.handleResponseError(response, endpoint, options);
      }

      return await response.json();
    } catch (error: any) {
      throw new Error(`CrUX API Fetch Error: ${error.message}`);
    }
  }

  private async handleResponseError(
    response: Response,
    endpoint: string,
    options: RequestInit & { retry?: number }
  ): Promise<any> {
    const status = response.status;
    const errorData = await this.safeJson(response);

    // Throw transformed error
    throw new Error(
      `CrUX API Error (${status}): ${
        errorData?.error?.message || response.statusText
      }`
    );
  }

  private async safeJson(response: Response): Promise<any> {
    try {
      return await response.json();
    } catch {
      return null;
    }
  }

  async queryRecord(payload: any): Promise<any> {
    return this.request(endPoints.CRUX_API_ENDPOINT, {
      method: FETCH_METHODS.POST,
      body: JSON.stringify(payload),
    });
  }
}

export default new CruxApiClient();
