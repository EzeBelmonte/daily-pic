import type { User } from "../types/user.type.js";

// ========================================
// ESTADOS DE LA SOLICITUD
// ========================================
const CONTACT_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type ContactStatus =
  typeof CONTACT_STATUS[keyof typeof CONTACT_STATUS];

// ========================================
// RESPUESTA DEL ESTADOS DE LA SOLICITUD
// ========================================
export interface ContactRelationship {
  id: number;
  status: ContactStatus;
}

// ========================================
// DATOS DEL CONTACTO
// ========================================
export interface Contact {
  id: number;
  createdAt: Date;
  requesterId: number;
  addresseeId: number;
  status: ContactStatus;
}

// ========================================
// ESTRUCTURA DE LOS PENDIENTES
// ========================================
export interface PendingContact {
  id: number;
  status: ContactStatus;
  createdAt: Date;

  requester: User;
}
