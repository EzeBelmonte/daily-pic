import * as contactsRepository from "./contacts.repository.js";

import type { 
  ContactRelationship,
  Contact,
  PendingContact
} from "@daily-pic/shared/types";


import { 
  getExistingUserById
} from "../../shared/helpers/getExistingUser.js";

// ========================================
// CREAR SOLICITUD
// ========================================
export async function createContact(
  requesterId: number,
  addresseeId: number
): Promise<Contact> {
  const userAExisting = await getExistingUserById(requesterId);
  const userBExisting = await getExistingUserById(addresseeId);

  if (!userAExisting || !userBExisting) {
    throw new Error("Uno de los usuarios no existe");
  }

  const existingRelation =
    await contactsRepository.findRelationship(
      requesterId,
      addresseeId
    );

  if (existingRelation) {
    throw new Error("Ya existe una solicitud o relación entre estos usuarios");
  }

  const contact = 
    await contactsRepository.createContactRequest(
      requesterId,
      addresseeId
    );

  if (!contact) {
    throw new Error("No se pudo crear el contacto")
  }

  return contact;
}

// ========================================
// OBTENER RELACIÓN ENTRE DOS USUARIOS
// ========================================
export async function findRelationship(
  userA: number,
  userB: number
): Promise<ContactRelationship | null> {
  const userAExisting = await getExistingUserById(userA);
  const userBExisting = await getExistingUserById(userB);

  if (!userAExisting || !userBExisting) {
    throw new Error("Uno de los usuarios no existe");
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
  const userExisting = await getExistingUserById(userId);

  if (!userExisting) {
    throw new Error("El usuario no existe");
  }

  const pending = 
    await contactsRepository.getPendingRequest(
      userId,
    );

  return pending;
}

// ========================================
// OBTENER SOLICITUD POR ID
// ========================================
export async function getContactById(
  id: number,
): Promise<Contact> {
  const contact = 
    await contactsRepository.getContactRequestById(
      id,
    );
  
  if (!contact) {
    throw new Error("La solicitud no existe");
  }

  return contact;
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  id: number,
) {
  await contactsRepository.acceptRequest(id);
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function rejectRequest(
  id: number,
) {
  await contactsRepository.rejectRequest(id);
}

// ========================================
// LISTA DE AMIGOS
// ========================================
export async function getAcceptedContacts(
  userId: number,
): Promise<Contact[]> {
  const userExisting = await getExistingUserById(userId);

  if (!userExisting) {
    throw new Error("El usuario no existe");
  }

  const contacts = 
    await contactsRepository.getAcceptedContacts(
      userId,
    );
  
  return contacts;
}

// ========================================
// CONTADOR DE PENDIENTES
// ========================================
export async function countPendingRequests(
  userId: number,
) {
  const userExisting = await getExistingUserById(userId);

  if (!userExisting) {
    throw new Error("El usuario no existe");
  }

  const count = 
    await contactsRepository.countPendingRequests(
      userId,
    );
  
  return count;
}

// ========================================
// CONTADOR DE CONTACTOS
// ========================================
export async function countContacts(
  userId: number,
) {
  const userExisting = await getExistingUserById(userId);

  if (!userExisting) {
    throw new Error("El usuario no existe");
  }

  const count = 
    await contactsRepository.countContacts(
      userId,
    );
  
  return count;
}