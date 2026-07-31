import api from "./axios";

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
// EIMINAR SOLICITUD
// ========================================
export async function rejectRequest(
  requestId: number
) {
  await api.delete(
    `/users/contacts/requests/${requestId}/reject`
  );
}