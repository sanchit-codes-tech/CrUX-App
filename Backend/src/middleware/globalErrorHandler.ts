import { Request, Response, NextFunction } from "express";
import { AppValidationMessages } from "../constants.ts";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = (err as any).statusCode || 500;
  const message = err.message || AppValidationMessages.SERVER_ERROR;

  res.status(statusCode).json({
    success: false,
    message,
    stack: err.stack,
  });
};
