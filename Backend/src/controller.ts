import type { Request, Response, NextFunction } from "express";
import CruxService from "./services.ts";
import { AppValidationMessages } from "./constants.ts";

class CruxController {
  async analyzeBatch(req: Request, res: Response, next: NextFunction) {
    try {
      const { urls, formFactor = "PHONE" } = req.query;

      const parsedUrls =
        urls && typeof urls === "string" && urls.length ? JSON.parse(urls) : "";

      if (
        !parsedUrls ||
        !Array.isArray(parsedUrls) ||
        parsedUrls.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message: AppValidationMessages.URL_ARR_REQUIRED,
        });
      }

      if (parsedUrls.length > 10) {
        return res.status(400).json({
          success: false,
          message: AppValidationMessages.MAX_URLS_ALLOW,
        });
      }

      const results = await CruxService.fetchMultipleUrls(
        parsedUrls,
        formFactor as string
      );

      res.json({
        success: true,
        data: {
          results: results,
          count: results.length,
        },
        meta: {
          requestId: (req as any).id ?? null,
          timestamp: new Date().toISOString(),
        },
      });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CruxController();
