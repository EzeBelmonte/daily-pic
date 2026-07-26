const CONTACT_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
} as const;

export type ContactStatus =
  typeof CONTACT_STATUS[keyof typeof CONTACT_STATUS];
