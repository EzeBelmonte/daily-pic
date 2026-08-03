import { z } from "zod";

import { registerSchema } from "@daily-pic/shared/schemas";

export const registerFormSchema =
  registerSchema
    .extend({
      repeatPassword: z.string(),
    })
    .refine(
      (data) =>
        data.password === data.repeatPassword,
      {
        message: "Las contraseñas no coinciden",
        path: ["repeatPassword"],
      }
    );

export type RegisterFormSchema =
  z.infer<typeof registerFormSchema>;