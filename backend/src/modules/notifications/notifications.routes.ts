import { Router } from "express";

import * as notificationController from "./notifications.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/", authenticate, asyncHandler(notificationController.getNotifications));
router.patch("/:notificationId/read", authenticate, asyncHandler(notificationController.markAsRead));

export default router;