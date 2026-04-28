import { Router } from "express";
import { dashboardController, authMiddleware } from "@/container.js";
import { asyncHandler } from "@/shared/http/middlewares/asyncHandler.js";

const router = Router();

router.get(
    "/",
    authMiddleware.authenticate,
    asyncHandler(dashboardController.getPipelineOverview)
);

export default router;