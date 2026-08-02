export type FeedCursor = {
  createdAt: Date;
  id: number;
};

export function encodeCursor(
  cursor: FeedCursor
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
): FeedCursor {
  const decoded = Buffer
    .from(cursor, "base64url")
    .toString("utf-8");

  const data = JSON.parse(decoded);

  return {
    createdAt: new Date(data.createdAt),
    id: Number(data.id),
  }
}