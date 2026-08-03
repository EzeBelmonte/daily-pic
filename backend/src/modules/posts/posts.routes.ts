import { Router } from "express";

import * as postController from "./posts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.post("/", authenticate, upload.single("image"), postController.create);
router.get("/me", authenticate, postController.getMyPosts);
router.patch("/:postId", authenticate, postController.update);
router.delete("/:postId", authenticate, postController.deleteRequest);
router.get("/user/:username", authenticate,postController.getUserPosts);

// ========================================
// PÚBLICAS
// ========================================
router.get("/:postId", postController.getPost);

export default router;