export type AppNotification = {
  id: string;

  type:
    | "contactRequest"
    | "contactAccepted"
    | "chatRequest";

  fromUserId: number;
};