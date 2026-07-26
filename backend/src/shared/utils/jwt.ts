import jwt, { type Secret, type SignOptions } from "jsonwebtoken";
import type { JwtPayload } from "../types/jwt.type.js";


export function generateToken(payload: JwtPayload) {
  const secret: Secret = process.env.JWT_SECRET!;

  const options: SignOptions = {
    expiresIn: 60 * 60 * 24 * 7, // 7 días en segundos
  }

  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string) {
  return jwt.verify(
    token,
    process.env.JWT_SECRET!
  ) as JwtPayload;
}