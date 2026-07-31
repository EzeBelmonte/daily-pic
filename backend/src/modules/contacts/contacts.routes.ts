import { Router } from "express";

import * as contactsController from "./contacts.controller.js";

import { authenticate } from "../../shared/middlewares/auth.middleware.js";

const router: Router = Router();

// ========================================
// PRIVADAS
// ========================================
router.post("/contacts/:userId", authenticate, contactsController.createContact);
router.get("/contacts/relation/:userId", authenticate, contactsController.findRelationship);
router.get("/contacts/pending-list", authenticate, contactsController.getPending);
router.get("/contacts/:contactId", authenticate, contactsController.getContactById);
router.patch("/contacts/requests/:requestId/accept", authenticate, contactsController.acceptRequest);
router.delete("/contacts/requests/:requestId/reject", authenticate, contactsController.rejectRequest);
router.get("/contacts", authenticate, contactsController.getAcceptedContacts);
router.get("/contacts/count-pending", authenticate, contactsController.countPendingRequests);
router.get("/contacts/count-contacts", authenticate, contactsController.countContacts);

export default router;