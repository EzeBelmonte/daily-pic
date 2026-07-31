// ========================================
// NOTIFICATION
// ========================================
export type Notification = {
  id: string;
  type: "contactRequest";
  fromUserId: number;
};

// ========================================
// SOCKET
// ========================================
export type SocketContextType = {
  connected: boolean;
  notifications: Notification[];
};