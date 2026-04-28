import { Router } from "express";
import { opportunitySummaryController, authMiddleware } from "@/container.js";
import { asyncHandler } from "@/shared/http/middlewares/asyncHandler.js";

const router = Router();

router.get(
    "/",
    authMiddleware.authenticate,
    asyncHandler(opportunitySummaryController.findOpportunitiesByUserHierarchy)
);

export default router;