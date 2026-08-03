import api from "./axios";

import type { PendingContact } from "@daily-pic/shared/types";

// ========================================
// OBTENER RELACIÓN
// ========================================
export async function getRelationship(
  userId: number
) {
  const response = await api.get(
    `/users/contacts/relation/${userId}`
  );

  return response.data;
}

// ========================================
// ENVIAR SOLICITUD
// ========================================
export async function addContact(
  userId: number
) {
  const response = await api.post(
    `/users/contacts/${userId}`
  );

  return response.data;
}

// ========================================
// ACEPTAR SOLICITUD
// ========================================
export async function acceptReqiest(
  requestId: number
) {
  await api.patch(
    `/users/contacts/requests/${requestId}/accept`
  );
}

// ========================================
// EIMINAR SOLICITUD
// ========================================
export async function rejectRequest(
  requestId: number
) {
  await api.delete(
    `/users/contacts/requests/${requestId}/reject`
  );
}

// ========================================
// LISTADO DE PENDIENTES
// ========================================
export async function getPending() {
  const response =
    await api.get<PendingContact[]>("/users/contacts/pending-list");
  console.log(response.data)
  return response.data;
}