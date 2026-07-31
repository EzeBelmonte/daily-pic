import { Server } from "socket.io";
import type { Server as HttpServer } from "http";

let io: Server;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Cliente conectado:", socket.id);

    socket.on("joinUserRoom", (userId: number) => {
      socket.join(`user:${userId}`);

      console.log(
        `👤 Usuario ${userId} conectado a su room`
      );
    });

    socket.on("disconnect", () => {
      console.log(
        "❌ Cliente desconectado:",
        socket.id
      );
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error(
      "Socket.IO no fue inicializado"
    );
  }

  return io;
}