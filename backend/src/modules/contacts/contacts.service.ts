import * as contactsRepository from "./contacts.repository.js";

import type { 
  ContactRelationship,
  Contact,
  PendingContact,
  AcceptedContact,
} from "@daily-pic/shared/types";

import { getExistingUserById } from "../../shared/helpers/getExistingUser.js";
import { NotFoundError } from "../../shared/errors/errors.js";

import { toContactDTO } from "../../shared/mappers/contact.mapper.js";

// ========================================
// OBTENER RELACIÓN ENTRE DOS USUARIOS
// ========================================
export async function getRelationship(
  userA: number,
  userB: number
): Promise<ContactRelationship | null> {
  await getExistingUserById(userA);
  await getExistingUserById(userB);

  const relation = 
    await contactsRepository.findRelationship(
      userA,
      userB
    );

  return relation ?? null;
}

// ========================================
// CREAR SOLICITUD
// ========================================
export async function create(
  requesterId: number,
  addresseeId: number
): Promise<Contact> {
  await getExistingUserById(requesterId);
  await getExistingUserById(addresseeId);

  const existingRelation =
    await contactsRepository.findRelationship(
      requesterId,
      addresseeId
    );

  if (existingRelation) {
    throw new NotFoundError(
      "Ya existe una solicitud o relación entre estos usuarios"
    );
  }

  const contact = 
    await contactsRepository.create(
      requesterId,
      addresseeId
    );

  if (!contact) {
    throw new NotFoundError(
      "Error al seguir al usuario"
    );
  }

  return contact;
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function updateAccepted(
  id: number,
) {
  const contact =
    await contactsRepository.updateAccepted(id);

  if (!contact) {
    throw new NotFoundError(
      "Error al aceptar la solicitud"
    );
  }

  return contact;
}

// ========================================
// EIMINAR SOLICITUD / RELACIÓN
// ========================================
export async function deleteById(
  id: number,
) {
  await contactsRepository.deleteById(id);
}

// ========================================
// SOLICITUDES PENDIENTES
// ========================================
export async function getPending(
  userId: number,
): Promise<PendingContact[] | []> {
  const pending = 
    await contactsRepository.findPending(
      userId,
    );

  return pending || [];
}

// ========================================
// LISTADO DE ACEPTADOS
// ========================================
export async function getAccepted(
  userId: number,
): Promise<AcceptedContact[] | []> {
  const contacts = 
    await contactsRepository.findAccepted(
      userId,
    );

  return Promise.all(
    contacts.map(async (contact) => {
      const user = await getExistingUserById(contact.requesterId);

      return toContactDTO(contact, user);
    }),
  );
}

// ========================================
// OBTENER CONTACTO
// ========================================
export async function getContact(
  id: number,
): Promise<Contact | null> {
  const contact = 
    await contactsRepository.findById(id);
  
  if (!contact) {
    throw new NotFoundError(
      "El contacto no existe"
    );
  }

  return contact;
}

// ========================================
// CONTADOR DE PENDIENTES
// ========================================
export async function countPending(
  userId: number,
) {
  const count = 
    await contactsRepository.countPending(
      userId,
    );
  
  return count;
}

// ========================================
// CONTADOR DE CONTACTOS
// ========================================
export async function countAccepted(
  userId: number,
) {
  const count = 
    await contactsRepository.countAccepted(
      userId,
    );
  
  return count;
}