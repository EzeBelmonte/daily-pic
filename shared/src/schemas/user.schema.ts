import { z } from "zod";
// ========================================
// DATOS EDITABLES
// ========================================

export const userUpdateSchema = z.object({
name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres")
    .optional(),

  lastname: z
    .string()
    .max(100, "El apellido no puede superar los 100 caracteres")
    .optional(),

  isPrivate: z
    .boolean()
    .optional(),

  bio: z
    .string()
    .max(1000, "La biografía no puede superar los 1000 caracteres")
    .optional(),
});

export type UserUpdateSchema =
  z.infer<typeof userUpdateSchema>;