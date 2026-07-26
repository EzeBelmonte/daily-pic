import { Router } from "express";

import * as postController from "./posts.controller.js";
import * as likesController from "../likes/likes.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

// Privado
router.post("/", authenticate, upload.single("image"), postController.createPost);
router.get("/me", authenticate, postController.getPosts);
router.patch("/:postId", authenticate, postController.updatePost);
router.delete("/:postId", authenticate, postController.deletePost);

router.get("/:postId/count", authenticate, likesController.getLikes);
router.post("/:postId/add-like", authenticate, likesController.addLike);
router.post("/:postId/remove-like", authenticate, likesController.removeLike);
router.get("/:postId/has-liked", authenticate, likesController.hasLiked);

// Público
router.get("/user/:username", postController.getUserPosts);
router.get("/:postId", postController.getPost);

export default router;