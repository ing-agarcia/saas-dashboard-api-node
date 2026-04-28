import { Router } from 'express';
import { authController, authMiddleware } from '@/container.js';
import { asyncHandler } from '@/shared/http/middlewares/asyncHandler.js';

const router = Router();

// Public
router.post("/login", authController.login);

router.get(
    "/validate",
    authMiddleware.authenticate,
    asyncHandler(authController.validate)
);

// Protected example
router.get(
    "/me",
    authMiddleware.authenticate,
    asyncHandler(authController.me)
);

export default router;