export interface CreateUserDTO {
  name: string;
  lastname?: string | "";
  email: string;
  username: string;
  password: string;
}

export interface CreateUserForm extends CreateUserDTO {
  repeatPassword: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}