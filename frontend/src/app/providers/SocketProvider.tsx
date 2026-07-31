import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { useQueryClient } from "@tanstack/react-query";

import { socket } from "@/lib/socket";

import { useAuth } from "../hooks/useAuth";
import { useMe } from "../hooks/queries/useMe";

import type { SocketContextType, Notification } from "../types/socket.type";

const SocketContext =
  createContext<SocketContextType>({
    connected: false,
    notifications: [],
  });

type Props = {
  children: ReactNode;
};

export function SocketProvider({
  children,
}: Props) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const { isAuthenticated } = useAuth();
  const { data: user } = useMe();

  const queryClient = useQueryClient();

  // Nos conectamos al Socket
  useEffect(() => {
    if (!isAuthenticated || !user) {
      socket.disconnect();
      return;
    }

    socket.connect();

    const handleNotification = (
      data: Omit<Notification, "id">
    ) => {
      const notification: Notification = {
        id: crypto.randomUUID(),
        ...data,
      };
      
      console.log("🔔 Nueva notificación:", notification);

      setNotifications((prev) => [
        ...prev,
        notification,
      ]);

      if (data.type === "contactRequest") {
        queryClient.invalidateQueries({
          queryKey: ["contacts", "pending"],
        });
      }
    }

    socket.on("connect", () => {
      console.log("🔌 Socket conectado");

      socket.emit(
        "joinUserRoom",
        user.id
      );
    });

    socket.on(
      "notification",
      handleNotification
    );

    return () => {
      socket.off("connect");
      socket.off(
        "notification",
        handleNotification
      );
      socket.disconnect();
    };
  }, [isAuthenticated, user]);

  return (
    <SocketContext.Provider
      value={{
        connected: socket.connected,
        notifications,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}