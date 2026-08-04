import jwt, { 
  type Secret, 
  type SignOptions 
} from "jsonwebtoken";

import type { 
  JwtPayload, 
  AccessTokenPayload, 
  RefreshTokenPayload 

} from "../types/jwt.type.js";

const accessSecret: Secret =
  process.env.JWT_ACCESS_SECRET!;

const refreshSecret: Secret =
  process.env.JWT_REFRESH_SECRET!;

// ========================================
// ACCESS TOKEN
// ========================================
export function generateAccessToken(
  payload: AccessTokenPayload
) {
  const options: SignOptions = {
    expiresIn: "15m",
  }

  return jwt.sign(
    payload, 
    accessSecret, 
    options
  );
}

// ========================================
// REFRESH TOKEN
// ========================================
export function generateRefreshToken(
  payload: RefreshTokenPayload
) {
  const options: SignOptions = {
    expiresIn: "30d",
  };

  return jwt.sign(
    payload,
    refreshSecret,
    options
  );
}

// ========================================
// VERIFICAR ACCESS TOKEN
// ========================================
export function verifyAccessToken(
  token: string
) {
  return jwt.verify(
    token,
    accessSecret
  ) as JwtPayload;
}

// ========================================
// VERIFICAR REFRESH TOKEN
// ========================================
export function verifyRefreshToken(
  token: string
) {
  return jwt.verify(
    token,
    refreshSecret
  ) as JwtPayload;
}