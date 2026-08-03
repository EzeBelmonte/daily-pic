import { z } from "zod";

// ========================================
// CREAR POST
// ========================================
export const postSchema = z.object({
  description: z
    .string()
    .max(1000, "La descripción no puede superar los 1000 caracteres")
    .optional(),
});

export type PostSchema = z.infer<typeof postSchema>;