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
//Backend
export interface ContactRelationship {
  id: number;
  status: ContactStatus;
}

// ========================================
// DATOS DEL CONTACTO
// ========================================
//Backend
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
//Backend y Frontend
export interface PendingContact {
  id: number;
  status: ContactStatus;
  createdAt: Date;

  requester: User;
}

// ========================================
// ESTRUCTURA DE LOS ACEPTADOS
// ========================================
//Backend y Frontend
export interface AcceptedContact {
  id: number;
  createdAt: string;
  user: User;
}