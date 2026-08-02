import { Router } from "express";

import * as postController from "./posts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.post("/", authenticate, upload.single("image"), postController.createPost);
router.get("/me", authenticate, postController.getPosts);
router.patch("/:postId", authenticate, postController.updatePost);
router.delete("/:postId", authenticate, postController.deletePost);
router.get("/user/:username", authenticate,postController.getUserPosts);

// ========================================
// PÚBLICAS
// ========================================
router.get("/:postId", postController.getPost);

export default router;