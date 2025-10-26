import dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import CruxRouter from "./src/routes.ts";
import { errorHandler } from "./src/middleware/globalErrorHandler.ts";
import { AppConfig } from "./src/constants.ts";

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    origin: AppConfig.CORS,
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Compression
app.use(compression());
// Routes
app.use(AppConfig.ROUTES_BASE_URL, CruxRouter);

// Error handling
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Server running on port 3000"));

export default app;
