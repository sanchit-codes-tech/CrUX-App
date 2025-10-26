import { Request, Response, NextFunction } from "express";
import { AppValidationMessages } from "../constants.ts";
import { validateURL } from "../utils/validation.ts";

export const validateSingleUrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const url = req.query.url as string | undefined;
    const origin = req.query.origin as string | undefined;
    const formFactor = req.query.formFactor as string | undefined;

    if (url) {
      validateURL(JSON.stringify(url));
    }
    if (origin) {
      validateURL(JSON.stringify(origin));
    }

    next();
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: AppValidationMessages.INVALID_URL_FORMAT,
        errors: error.message,
      });
  }
};

export const validateBatchUrls = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let urls = req.query.urls as string[] | undefined;
    const formFactor = req.query.formFactor as string | undefined;

    urls = JSON.parse(urls as any);

    if (!Array.isArray(urls)) {
      throw new Error(AppValidationMessages.URLS_MUST_BE_ARRAY);
    }

    urls.forEach((url: string) => {
      validateURL(url);
    });

    next();
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(400).json({
        success: false,
        message: AppValidationMessages.URLS_MUST_BE_ARRAY,
        errors: error.message,
      });
  }
};
