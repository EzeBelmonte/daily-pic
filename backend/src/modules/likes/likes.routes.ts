import { Router } from "express";

import * as likesController from "../likes/likes.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/:postId/count", authenticate, likesController.getLikes);
router.post("/:postId/add-like", authenticate, likesController.addLike);
router.post("/:postId/remove-like", authenticate, likesController.removeLike);
router.get("/:postId/has-liked", authenticate, likesController.hasLiked);

export default router;