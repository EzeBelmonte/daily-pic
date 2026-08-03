import { Router } from "express";

import * as contactsController from "./contacts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.post("/contacts/:userId", authenticate, contactsController.create);
router.get("/contacts/relation/:userId", authenticate, contactsController.getRelationship);
router.get("/contacts/pending-list", authenticate, contactsController.getPending);
router.get("/contacts/:contactId", authenticate, contactsController.getContact);
router.patch("/contacts/requests/:requestId/accept", authenticate, contactsController.acceptRequest);
router.delete("/contacts/requests/:requestId/reject", authenticate, contactsController.deleteRequest);
router.get("/contacts", authenticate, contactsController.getAccepted);
router.get("/contacts/count-pending", authenticate, contactsController.countPending);
router.get("/contacts/count-contacts", authenticate, contactsController.countAccepted);

export default router;