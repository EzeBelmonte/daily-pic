import { Router } from "express";

import * as userController from "./users.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { upload } from "../../shared/middlewares/upload.middleware.js";

const router: Router = Router();

// ========================================
// RUTAS DEL MÓDOLO USERS - PRIVADAS
// ========================================
router.get("/me", authenticate, userController.getMe);
router.get("/profile", authenticate, userController.getMyCompleteUser);
router.patch("/config", authenticate, upload.single("image"), userController.updateProfileUser);

// ========================================
// RUTAS DEL MÓDOLO USERS - PÚBLICAS
// ========================================
router.get("/:username", userController.getCompleteUser);

export default router;