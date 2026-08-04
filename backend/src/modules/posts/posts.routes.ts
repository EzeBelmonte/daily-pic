import { Router } from "express";

import * as postsController from "./posts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/publication-status", authenticate, postsController.getPublicationStatus);
router.post("/", authenticate, upload.single("image"), postsController.create);
router.get("/me", authenticate, postsController.getMyPosts);
router.patch("/:postId", authenticate, postsController.update);
router.delete("/:postId", authenticate, postsController.deleteRequest);
router.get("/user/:username", authenticate,postsController.getUserPosts);

// ========================================
// PÚBLICAS
// ========================================
router.get("/:postId", postsController.getPost);

export default router;