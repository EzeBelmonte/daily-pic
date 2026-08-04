import { ConflictError } from "./errors.js";

export class PublicationLimitError extends ConflictError {
  constructor(
    message = "Ya realizaste tu publicación diaria"
  ) {
    super(message);
    
    this.name = "PublicationLimitError";
  }
}