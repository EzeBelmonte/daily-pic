export interface JwtPayload {
  userId: number;
  sessionId: number;
}

export interface AccessTokenPayload {
  userId: number;
  sessionId: number;
}

export interface RefreshTokenPayload {
  userId: number;
}