import { Router } from "express";
import { userController, authMiddleware } from "@/container.js";
import { asyncHandler } from "@/shared/http/middlewares/asyncHandler.js";


const router = Router();

router.get(
    "/",
    authMiddleware.authenticate,
    asyncHandler(userController.getAll)
);

router.post("/",
    authMiddleware.authenticate,
    asyncHandler(userController.createUser)
);

router.put("/:id",
    authMiddleware.authenticate,
    asyncHandler(userController.updateUser)
);

router.delete("/:id",
    authMiddleware.authenticate,
    asyncHandler(userController.deleteUser)
);

router.get(
    "/managers/:roleId",
    authMiddleware.authenticate,
    asyncHandler(userController.getManagersByRole)
);

router.get(
    "/report",
    authMiddleware.authenticate,
    asyncHandler(userController.download)
);

export default router;