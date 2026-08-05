import { Router } from "express";

import * as contactsController from "./contacts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.post("/add/:userId", authenticate, asyncHandler(contactsController.create));
router.get("/relation/:userId", authenticate,  asyncHandler(contactsController.getRelationship));
router.get("/pending-list", authenticate,  asyncHandler(contactsController.getPending));
router.get("/:contactId", authenticate,  asyncHandler(contactsController.getContact));
router.patch("/requests/:requestId/accept", authenticate,  asyncHandler(contactsController.acceptRequest));
router.delete("/requests/:requestId/reject", authenticate,  asyncHandler(contactsController.deleteRequest));
router.get("/", authenticate,  asyncHandler(contactsController.getAccepted));
//router.get("/count-pending", authenticate,  asyncHandler(contactsController.countPending));
//router.get("/count-contacts", authenticate,  asyncHandler(contactsController.countAccepted));

export default router;