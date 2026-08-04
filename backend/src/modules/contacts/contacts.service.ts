import * as contactsRepository from "./contacts.repository.js";

import type { 
  ContactRelationship,
  Contact,
  PendingContact
} from "@daily-pic/shared/types";

import { 
  getExistingUserById
} from "../../shared/helpers/getExistingUser.js";

import { NotFoundError } from "../../shared/errors/errors.js";

// ========================================
// CREAR RELACIÓN
// ========================================
export async function create(
  requesterId: number,
  addresseeId: number
): Promise<Contact> {
  const userAExisting = await getExistingUserById(requesterId);
  const userBExisting = await getExistingUserById(addresseeId);

  if (!userAExisting || !userBExisting) {
    throw new NotFoundError(
      "Uno de los usuarios no existe"
    );
  }

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
// OBTENER RELACIÓN ENTRE DOS USUARIOS
// ========================================
export async function getRelationship(
  userA: number,
  userB: number
): Promise<ContactRelationship | null> {
  const userAExisting = await getExistingUserById(userA);
  const userBExisting = await getExistingUserById(userB);

  if (!userAExisting || !userBExisting) {
    throw new NotFoundError(
      "Uno de los usuarios no existe"
    );
  }

  const relation = 
    await contactsRepository.findRelationship(
      userA,
      userB
    );

  return relation ?? null;
}

// ========================================
// SOLICITUDES PENDIENTES
// ========================================
export async function getPending(
  userId: number,
): Promise<PendingContact[]> {
  const pending = 
    await contactsRepository.findPending(
      userId,
    );

  return pending;
}

// ========================================
// OBTENER CONTACTO
// ========================================
export async function getContact(
  id: number,
): Promise<Contact> {
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
// ACEPTAR RELACIÓN
// ========================================
export async function updateAccepted(
  id: number,
) {
  await contactsRepository.updateAccepted(id);
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function deleteById(
  id: number,
) {
  await contactsRepository.deleteById(id);
}

// ========================================
// LISTA DE AMIGOS
// ========================================
export async function getAccepted(
  userId: number,
): Promise<Contact[]> {
  const contacts = 
    await contactsRepository.findAccepted(
      userId,
    );
  
  return contacts;
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