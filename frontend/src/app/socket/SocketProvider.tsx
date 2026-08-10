import {
  createContext,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

import { socket } from "@/lib/socket";

import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../hooks/useAuth";
import { useMe } from "../hooks/queries/useMe";

import { 
  registerNotificationListener,
  registerChatListener,
  registerContactListener,
  registerPostLikeListener
} from "./index";

import type { SocketContextType } from "./types/socket.type";

const SocketContext = createContext<SocketContextType>({
  connected: false,
});

type Props = {
  children: ReactNode;
};

export function SocketProvider({ children }: Props) {
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

    socket.on("connect", () => {
      console.log("🔌 Socket conectado");
      socket.emit("joinUserRoom", user.id);
    });
      
    const unregisterNotification = 
      registerNotificationListener(queryClient);

    const unregisterContact = 
      registerContactListener(queryClient);

    const unregisterLike =
      registerPostLikeListener(queryClient);

    const unregisterChat = 
      registerChatListener(queryClient);

    return () => {
      unregisterNotification();
      unregisterLike();
      unregisterContact();
      unregisterChat();

      socket.disconnect();
    }
  }, [isAuthenticated, user, queryClient]);

  return (
    <SocketContext.Provider 
      value={{ 
        connected: socket.connected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocket() {
  return useContext(SocketContext);
}