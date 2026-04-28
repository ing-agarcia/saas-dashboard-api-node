import { Router } from "express";
import { opportunityController, authMiddleware } from "@/container.js";
import { asyncHandler } from "@/shared/http/middlewares/asyncHandler.js";

const router = Router();

router.get(
    "/",
    authMiddleware.authenticate,
    asyncHandler(opportunityController.createOpportunity)
);

export default router;