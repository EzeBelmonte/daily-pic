import { Router } from "express";

import * as userController from "./users.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/me", authenticate, asyncHandler(userController.getMe));
router.patch("/me", authenticate, upload.single("image"), asyncHandler(userController.updateMe));

// ========================================
// PÚBLICAS
// ========================================
router.get("/:username", asyncHandler(userController.getUser));

export default router;