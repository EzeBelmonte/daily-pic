import * as contactsRepository from "./contacts.repository.js";
import * as notificationsService from "../notifications/notifications.service.js";

import type { 
  ContactRelationship,
  Contact,
  PendingContact,
  AcceptedContact,
  AppNotification,
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
): Promise<{
  contact: Contact;
  notification: AppNotification | null;
}> {

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
      "Error en la solicitud o relación entre estos usuarios"
    );
  }

  const notification = 
    await notificationsService.create(
      "contactRequest",
      requesterId,
      addresseeId,
      contact?.id,
    );

  return {
    contact,
    notification: notification ?? null,
  }
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function updateAccepted(
  contactId: number,
): Promise<{
  contact: Contact;
  notificationAccepted: AppNotification | null;
}> {
  const contact =
    await contactsRepository.updateAccepted(contactId);

  if (!contact) {
    throw new NotFoundError(
      "Error al aceptar la solicitud"
    );
  }

  // Actualizamos la notificacion de quien aceptó
  await notificationsService.updateContactNotification(
    contact.id,
  );


  // Creamos la notificación de quien fue aceptado
  const notificationAccepted =
    await notificationsService.create(
      "contactAccepted",
      contact.addresseeId, // Quien aceptó
      contact.requesterId, // Quien recibe la notificación
      contact.id,
    );

  return {
    contact,
    notificationAccepted: notificationAccepted ?? null,
  }
}

// ========================================
// EIMINAR SOLICITUD / RELACIÓN
// ========================================
export async function deleteById(
  contactId: number,
) {
  await contactsRepository.deleteById(contactId);

  await notificationsService.deleteContactRequest(contactId);
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
  contactId: number,
): Promise<Contact | null> {
  const contact = 
    await contactsRepository.findById(contactId);
  
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