import { z } from "zod";

// ========================================
// REGISTRO
// ========================================
export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(100, "El nombre no puede superar los 100 caracteres"),

  lastname: z
    .string()
    .max(100, "El nombre no puede superar los 100 caracteres")
    .optional(),

  email: z
    .email("Ingrese un email válido"),

  username: z
    .string()
    .min(3, "El usuario debe tener al menos 3 caracteres")
    .max(30, "El usuario no puede superar los 30 caracteres"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

// ========================================
// REGISTRO PARA FORMULARIO
// ========================================
export const registerFormSchema = registerSchema
  .extend({
    repeatPassword: z.string(),
  })
  .refine(
    (data) => data.password === data.repeatPassword,
    {
      message: "Las contraseñas no coinciden",
      path: ["repeatPassword"],
    }
  );

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;

// ========================================
// INICIO SESIÓN
// ========================================
export const loginSchema = z.object({
  identifier: z
    .string()
    .trim()
    .min(3, "Ingrese un usuario o email"),
  
  password: z
    .string()
    .min(8, "ingrese su contraseña"),
});

export type LoginSchema = z.infer<typeof loginSchema>;