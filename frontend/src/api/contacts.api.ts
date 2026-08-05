import api from "./api";

import type { 
  PendingContact,
  AcceptedContact, 
} from "@daily-pic/shared/types";

// ========================================
// OBTENER RELACIÓN
// ========================================
export async function getRelationship(
  userId: number
) {
  const response = await api.get(
    `/contacts/relation/${userId}`
  );

  return response.data;
}

// ========================================
// ENVIAR SOLICITUD
// ========================================
export async function create(
  userId: number
) {
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
// EIMINAR SOLICITUD
// ========================================
export async function deleteRequest(
  requestId: number
) {
  await api.delete(
    `/contacts/requests/${requestId}/reject`
  );
}

// ========================================
// LISTADO DE PENDIENTES
// ========================================
export async function getPending() {
  const response =
    await api.get<PendingContact[]>("/contacts/pending-list");

  return response.data;
}

// ========================================
// LISTADO DE ACEPTADOS
// ========================================
export async function getAccepted() {
  console.log("entre")
  const response =
    await api.get<AcceptedContact[]>("/contacts");

  console.log(response.data)
  return response.data;
}