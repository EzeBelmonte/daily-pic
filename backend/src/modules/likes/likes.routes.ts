import { Router } from "express";

import * as likesController from "../likes/likes.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/:postId/count", authenticate, asyncHandler(likesController.count));
router.post("/:postId/add-like", authenticate, asyncHandler(likesController.like));
router.post("/:postId/remove-like", authenticate, asyncHandler(likesController.dislike));
router.get("/:postId/has-liked", authenticate, asyncHandler(likesController.hasLiked));

export default router;