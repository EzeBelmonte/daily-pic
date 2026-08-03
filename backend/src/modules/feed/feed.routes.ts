import { Router } from "express";

import * as feedController from "./feed.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.get("/contacts", authenticate, feedController.getAccepted);

export default router;