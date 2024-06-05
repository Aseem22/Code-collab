import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { setupWSConnection } from "y-websocket/bin/utils";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: ["http://127.0.0.1:5173"] },
});
io.on("connection", (socket) => {
  const roomId = socket.handshake.query.roomId;

  if (!roomId) {
    socket.disconnect(true);
    return;
  }

  const ws = {
    send: (message) => socket.emit("message", message),
    close: () => socket.disconnect(),
    onmessage: (cb) => socket.on("message", cb),
    onclose: (cb) => socket.on("disconnect", cb),
    onerror: (cb) => socket.on("error", cb),
  };

  setupWSConnection(ws, { docName: roomId }, { gc: true });
});

httpServer.listen(1234, () => {
  console.log("Socket.IO server running on port 1234");
});
