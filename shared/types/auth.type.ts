import type { User } from "./user.type";

export interface CreateUserDTO {
  name: string;
  lastname?: string;
  email: string;
  username: string;
  password: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}