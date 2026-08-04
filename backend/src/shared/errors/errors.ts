import { AppError } from "./AppError.js";

export class BadRequestError extends AppError {
  constructor(message = "Solicitud inválida") {
    super(400, message);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = "No autorizado") {
    super(401, message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends AppError {
  constructor(
    message = "No tienes permiso para realizar esta acción"
  ) {
    super(403, message);
    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends AppError {
  constructor(message = "Recurso no encontrado") {
    super(404, message);
    this.name = "NotFoundError";
  }
}

export class ConflictError extends AppError {
  constructor(message = "El recurso ya existe") {
    super(409, message);
    this.name = "ConflictError";
  }
}