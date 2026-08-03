import { z } from "zod";

// ========================================
// CREAR POST
// ========================================
export const postSchema = z.object({
  description: z
    .string()
    .max(1000)
    .optional(),
});

export type PostSchema = z.infer<typeof postSchema>;
