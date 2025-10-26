import express from "express";
import CruxController from "./controller.ts";
import {
  validateSingleUrl,
  validateBatchUrls,
} from "./middleware/validator.ts";
import { endPoints } from "./service/endpoints.ts";

const router = express.Router();

router.get(
  endPoints.BATCH_ANALYZE,
  validateBatchUrls,
  CruxController.analyzeBatch
);

export default router;
