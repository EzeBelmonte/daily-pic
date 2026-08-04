import { Router } from "express";

import * as feedController from "./feed.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/contacts", authenticate, asyncHandler(feedController.getAccepted));

export default router;