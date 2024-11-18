// socketConfig.mjs
import { Server } from "socket.io";

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    },
  });

  io.on("connection", (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Example of a custom event
    socket.on("message", (data) => {
      console.log(`Message from ${socket.id}:`, data);

      // Broadcast the message to all connected clients
      io.emit("message", data);
    });

    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default setupSocket;
