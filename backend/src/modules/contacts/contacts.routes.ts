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
router.post("/contacts/accept", authenticate, contactsController.acceptRequest);
router.delete("/contacts/delete", authenticate, contactsController.deleteRelationship);
router.get("/contacts", authenticate, contactsController.getAcceptedContacts);
router.get("/contacts/count-pending", authenticate, contactsController.countPendingRequests);
router.get("/contacts/count-contacts", authenticate, contactsController.countContacts);

export default router;