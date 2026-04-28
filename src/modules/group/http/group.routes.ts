import { Router } from 'express';
import { groupController, authMiddleware } from '@/container.js';

const router = Router();

router.post(
    '/',
    authMiddleware.authenticate,
    groupController.createGroup
);

router.get(
    '/',
    authMiddleware.authenticate,
    groupController.getGroups
);

export default router;