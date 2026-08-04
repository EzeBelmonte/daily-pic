import { Router } from "express";

import * as postsController from "./posts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/publication-status", authenticate, asyncHandler(postsController.getPublicationStatus));
router.post("/", authenticate, upload.single("image"), asyncHandler(postsController.create));
router.get("/me", authenticate, asyncHandler(postsController.getMyPosts));
router.patch("/:postId", authenticate, asyncHandler(postsController.update));
router.delete("/:postId", authenticate, asyncHandler(postsController.deleteRequest));
router.get("/user/:username", authenticate, asyncHandler(postsController.getUserPosts));

// ========================================
// PÚBLICAS
// ========================================
router.get("/:postId", asyncHandler(postsController.getPost));

export default router;