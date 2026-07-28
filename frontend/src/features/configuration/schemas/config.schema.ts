import { z } from "zod";

// ========================================
// CONFIGURACIÓN PERFIL
// ========================================
export const configSchema = z.object({
  name: z
    .string()
    .min(3)
    .max(100)
    .optional(),
  
  lastname: z
    .string()
    .max(100)
    .optional(),

  isPrivate: z
    .boolean()
    .optional(),

  bio: z
    .string()
    .max(1000)
    .optional(),
  
  profileImage: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "La imagen no puede superar los 5MB"
    )
    .refine(
      (file) => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Formato de imagen inválido"
    )
    .optional(),
});

export type ConfigSchema = z.infer<typeof configSchema>;