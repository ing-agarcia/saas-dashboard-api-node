import { Router } from "express";
import { productController, authMiddleware } from "@/container.js";
import { asyncHandler } from "@/shared/http/middlewares/asyncHandler.js";

const router = Router();

router.get(
    "/",
    authMiddleware.authenticate,
    asyncHandler(productController.getAll)
);

export default router;