export type ScrollLoader = {
  createdAt: Date;
  id: number;
};

export function encodeCursor(
  cursor: ScrollLoader
): string {
  const data = {
    createdAt: cursor.createdAt.toISOString(),
    id: cursor.id,
  }

  return Buffer
    .from(JSON.stringify(data))
    .toString("base64url");
}

export function decodeCursor(
  cursor: string
): ScrollLoader {
  const decoded = Buffer
    .from(cursor, "base64url")
    .toString("utf-8");

  const data = JSON.parse(decoded);

  const createdAt = new Date(data.createdAt);
  const id = Number(data.id);

  if (
    Number.isNaN(createdAt.getTime()) ||
    !Number.isInteger(id) ||
    id <= 0
  ) {
    throw new Error("Cursor inválido")
  }

  return {
    createdAt: new Date(data.createdAt),
    id: Number(data.id),
  }
}