import { Router } from "express";

import * as blocksController from "./block.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";
import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.post("/add/:username", authenticate, asyncHandler(blocksController.blockUser));
router.delete("/remove/:username", authenticate, asyncHandler(blocksController.unblockUser));
router.get("/:username", authenticate, asyncHandler(blocksController.getBlockBetweenUsers));

export default router;