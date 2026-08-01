import type { Request, Response } from "express";

import { getIO } from "../../socket.js";

import * as contactsService from "./contacts.service.js";

// ========================================
// CREAR SOLICITUD
// ========================================
export async function createContact(
  req: Request,
  res: Response
) {
  try {
    // Usuario que está enviando la solicitud
    const requesterId = req.user.userId;

    // Usuario al que se le envía la solicitud
    const addresseeId = Number(req.params.userId);

    const contact =
      await contactsService.createContact(
        requesterId,
        addresseeId
      );

    // Notificar al usuario que recibió la solicitud
    getIO()
      .to(`user:${addresseeId}`)
      .emit("notification", {
        type: "contactRequest",
        fromUserId: requesterId,
      });

    return res.status(201).json(contact);

  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error
        ? error.message
        : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER RELACIÓN ENTRE DOS USUARIOS
// ========================================
export async function findRelationship(
  req: Request,
  res: Response
) {
  try {
    // Quien acepta la solicitud
    const userA = req.user.userId;

    // Quien envia la solicitud
    const userB = Number(req.params.userId);

    const relation = 
      await contactsService.findRelationship(
        userA,
        userB
      );
    
    return res.status(200).json(relation);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// SOLICITUDES PENDIENTES
// ========================================
export async function getPending(
  req: Request,
  res: Response
) {
  try {
    // Quien acepta la solicitud
    const userId = req.user.userId;

    const pending = 
      await contactsService.getPending(
        userId,
      );
    
    return res.status(200).json(pending);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// OBTENER SOLICITUD POR ID
// ========================================
export async function getContactById(
  req: Request,
  res: Response
) {
  try {
    // Id de la relación
    const id = Number(req.params.contactId);

    const contact = 
      await contactsService.getContactById(
        id
      );
    
    return res.status(200).json(contact);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  req: Request,
  res: Response
) {
  try {
    // Id de la relación
    const id = Number(req.params.requestId);

    await contactsService.acceptRequest(id);
    
    // Devolvemos mensaje de exito
    return res.status(200).send();
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// ELIMINAR RELACIÓN
// ========================================
export async function rejectRequest(
  req: Request,
  res: Response
) {
  try {
    // Id de la relación
    const id = Number(req.params.requestId);

    await contactsService.rejectRequest(id);
    
    // Devolvemos mensaje de exito
    return res.status(200).send();
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// LISTA DE AMIGOS
// ========================================
export async function getAcceptedContacts(
  req: Request,
  res: Response
) {
  try {
    // Usiario
    const userId = req.user.userId;

    const contacts = 
      await contactsService.getAcceptedContacts(
        userId
      );
    
    return res.status(200).json(contacts);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// CONTADOR DE PENDIENTES
// ========================================
export async function countPendingRequests(
  req: Request,
  res: Response
) {
  try {
    // Usiario
    const userId = req.user.userId;

    const count = 
      await contactsService.countPendingRequests(
        userId
      );
    
    return res.status(200).json(count);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}

// ========================================
// CONTADOR DE CONTACTOS
// ========================================
export async function countContacts(
  req: Request,
  res: Response
) {
  try {
    // Usiario
    const userId = req.user.userId;

    const count = 
      await contactsService.countContacts(
        userId
      );
    
    return res.status(200).json(count);
  } catch (error) {
    return res.status(400).json({
      message: error instanceof Error 
        ? error.message 
        : "Error desconocido",
    });
  }
}