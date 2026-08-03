import { Router } from "express";

import * as likesController from "../likes/likes.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/:postId/count", authenticate, likesController.count);
router.post("/:postId/add-like", authenticate, likesController.like);
router.post("/:postId/remove-like", authenticate, likesController.dislike);
router.get("/:postId/has-liked", authenticate, likesController.hasLiked);

export default router;