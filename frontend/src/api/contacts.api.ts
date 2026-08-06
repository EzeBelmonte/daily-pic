import api from "./api";

import type { 
  ContactRelationship,
  Contact,
  PendingContact,
  AcceptedContact,
} from "@daily-pic/shared/types";

// ========================================
// OBTENER RELACIÓN ENTRE DOS USUARIOS
// ========================================
export async function getRelationship(
  userId: number
): Promise<ContactRelationship | null> {
  const response = await api.get<ContactRelationship | null>(
    `/contacts/relation/${userId}`
  );

  return response.data;
}

// ========================================
// CREAR SOLICITUD
// ========================================
export async function create(
  userId: number
): Promise<Contact> {
  const response = await api.post(
    `/contacts/add/${userId}`
  );

  return response.data;
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptRequest(
  requestId: number
) {
  await api.patch(
    `/contacts/requests/${requestId}/accept`
  );
}

// ========================================
// EIMINAR SOLICITUD / RELACIÓN
// ========================================
export async function deleteRequest(
  requestId: number
) {
  await api.delete(
    `/contacts/requests/${requestId}/reject`
  );
}

// ========================================
// SOLICITUDES PENDIENTES
// ========================================
export async function getPending(
): Promise<PendingContact[] | []> {
  const response =
    await api.get<PendingContact[] | []>("/contacts/pending-list");

  return response.data;
}

// ========================================
// LISTADO DE ACEPTADOS
// ========================================
export async function getAccepted(
): Promise<AcceptedContact[] | []> {
  const response =
    await api.get<AcceptedContact[] | []>("/contacts");

  console.log(response.data)
  return response.data;
}