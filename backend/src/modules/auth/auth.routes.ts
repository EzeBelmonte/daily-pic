import { Router } from "express";
import * as authController from "./auth.controller.js";
import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PÚBLICAS
// ========================================
router.post("/register", asyncHandler(authController.register));
router.post("/login", asyncHandler(authController.login));

export default router;