import { db } from "../../infrastructure/database/db.js";
import { contacts } from "../../infrastructure/database/schemas/contacts.js";
import { and, eq, or, count } from "drizzle-orm";

// ========================================
// CREAR SOLICITUD
// ========================================
export async function createContactRequest(
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
}

// ========================================
// OBTENER RELACIÓN ENTRE DOS USUARIOS
// ========================================
export async function findRelationship(
  userA: number,
  userB: number
) {
  const [contact] = await db
    .select()
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
    .select()
    .from(contacts)
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
export async function deleteRelationship(id: number) {
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