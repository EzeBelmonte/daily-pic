import { db } from "../../infrastructure/database/db.js";
import { contacts } from "../../infrastructure/database/schemas/contacts.js";
import { and, eq, or, count } from "drizzle-orm";
import { users } from "../../infrastructure/database/schemas/users.js";

// ========================================
// CREAR SOLICITUD
// ========================================
/*export async function createContactRequest(
  requesterId: number,
  addresseeId: number
) {
  const [contact] = await db
    .insert(contacts)
    .values({
      requesterId,
      addresseeId,
    })
    .returning();

  return contact;
}*/
export async function createContactRequest(
  requesterId: number,
  addresseeId: number
) {
  try {
    const [contact] = await db
      .insert(contacts)
      .values({
        requesterId,
        addresseeId,
      })
      .returning();

    return contact;
  } catch (error) {
    console.error("❌ ERROR INSERT CONTACT:", error);
    throw error;
  }
}

// ========================================
// OBTENER RELACIÓN ENTRE DOS USUARIOS
// ========================================
export async function findRelationship(
  userA: number,
  userB: number
) {
  const [contact] = await db
    // Decidimos que datos devolver
    .select({
      id: contacts.id,
      status: contacts.status,
    })
    .from(contacts)
    .where(
      or(
        and(
          eq(contacts.requesterId, userA),
          eq(contacts.addresseeId, userB)
        ),
        and(
          eq(contacts.requesterId, userB),
          eq(contacts.addresseeId, userA)
        )
      )
    )
    .limit(1);

  return contact;
}

// ========================================
// SOLICITUDES PENDIENTES
// ========================================
export async function getPendingRequest(userId: number) {
  return db
    .select({
      id: contacts.id,
      status: contacts.status,
      createdAt: contacts.createdAt,

      requester: {
        id: users.id,
        profileImageUrl: users.profileImageUrl,
        username: users.username,
        name: users.name,
        lastname: users.lastname,
      }
    })
    .from(contacts)
    .innerJoin(
      users,
      eq(users.id, contacts.requesterId)
    )
    .where(
      and(
        eq(contacts.addresseeId, userId),
        eq(contacts.status, "pending")
      )
    );
}

// ========================================
// OBTENER SOLICITUD POR ID
// ========================================
export async function getContactRequestById(id: number) {
  const [contact] = await db
    .select()
    .from(contacts)
    .where(eq(contacts.id, id))
    .limit(1);

  return contact;
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(id: number) {
  const [contact] = await db
    .update(contacts)
    .set({
      status: "accepted",
      updatedAt: new Date(),
    })
    .where(eq(contacts.id, id))
    .returning();

  return contact;
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function rejectRequest(id: number) {
  await db
    .delete(contacts)
    .where(eq(contacts.id, id));
}

// ========================================
// LISTA DE AMIGOS
// ========================================
export async function getAcceptedContacts(userId: number) {
  return db
    .select()
    .from(contacts)
    .where(
      and(
        or(
          eq(contacts.requesterId, userId),
          eq(contacts.addresseeId, userId)
        ),
        eq(contacts.status, "accepted")
      )
    );
}

// ========================================
// CONTADOR DE PENDIENTES
// ========================================
export async function countPendingRequests(userId: number) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(contacts)
    .where(
      and(
        eq(contacts.addresseeId, userId),
        eq(contacts.status, "pending")
      )
    );

  return result?.count ?? 0;
}

// ========================================
// CONTADOR DE CONTACTOS
// ========================================
export async function countContacts(userId: number) {
  const [result] = await db
    .select({
      count: count(),
    })
    .from(contacts)
    .where(
      and(
        or(
          eq(contacts.requesterId, userId),
          eq(contacts.addresseeId, userId)
        ),
        eq(contacts.status, "accepted")
      )
    );

  return result?.count ?? 0;
}