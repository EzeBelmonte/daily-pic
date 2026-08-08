import type { InferSelectModel } from "drizzle-orm";

import { contacts } from "../../infrastructure/database/schemas/contacts.js";
import { users } from "../../infrastructure/database/schemas/users.js";

import type { AcceptedContact} from "@daily-pic/shared/types";

type ContactType = InferSelectModel<typeof contacts>;
type UserType = InferSelectModel<typeof users>;

// ========================================
// OBTENER AMIGO ACEPTADO
// ========================================
export function toContactDTO(
  contact: ContactType,
  user: UserType,
): AcceptedContact {
  return {
    id: contact.id,
    createdAt: contact.createdAt,
    user: {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      profileImageUrl: user.profileImageUrl,
    }
  };
}
