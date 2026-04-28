import { Router } from "express";
import { forecastController, authMiddleware } from "@/container.js";
import { asyncHandler } from "@/shared/http/middlewares/asyncHandler.js";

const router = Router();

router.get(
    "/trend",
    authMiddleware.authenticate,
    asyncHandler(forecastController.getTrendForecast)
);

export default router;