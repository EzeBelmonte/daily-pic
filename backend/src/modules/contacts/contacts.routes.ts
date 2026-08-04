import { Router } from "express";

import * as contactsController from "./contacts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

import { asyncHandler } from "../../shared/middlewares/asyncHandler.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.post("/contacts/:userId", authenticate, asyncHandler(contactsController.create));
router.get("/contacts/relation/:userId", authenticate,  asyncHandler(contactsController.getRelationship));
router.get("/contacts/pending-list", authenticate,  asyncHandler(contactsController.getPending));
router.get("/contacts/:contactId", authenticate,  asyncHandler(contactsController.getContact));
router.patch("/contacts/requests/:requestId/accept", authenticate,  asyncHandler(contactsController.acceptRequest));
router.delete("/contacts/requests/:requestId/reject", authenticate,  asyncHandler(contactsController.deleteRequest));
router.get("/contacts", authenticate,  asyncHandler(contactsController.getAccepted));
router.get("/contacts/count-pending", authenticate,  asyncHandler(contactsController.countPending));
router.get("/contacts/count-contacts", authenticate,  asyncHandler(contactsController.countAccepted));

export default router;