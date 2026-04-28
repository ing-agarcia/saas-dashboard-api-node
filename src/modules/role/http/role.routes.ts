import { Router } from "express";
import { roleController, authMiddleware } from "@/container.js";

const router = Router();

router.post(
    "/",
    authMiddleware.authenticate,
    roleController.createRole
);

router.get(
    "/",
    authMiddleware.authenticate,
    roleController.getRoles
);

export default router;