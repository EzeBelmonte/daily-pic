export class PublicationLimitError extends Error {
  constructor(message = "Ya realizaste tu publicación diaria") {
    super(message);
    this.name = "PublicationLimitError";
  }
}