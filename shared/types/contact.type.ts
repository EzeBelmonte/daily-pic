const CONTACT_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type ContactStatus =
  typeof CONTACT_STATUS[keyof typeof CONTACT_STATUS];


export interface ContactRelationship {
  id: number;
  status: ContactStatus;
}

export interface Contact {
  id: number;
  createdAt: Date;
  requesterId: number;
  addresseeId: number;
  status: ContactStatus;
} 