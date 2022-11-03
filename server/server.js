//const { Socket } = require("dgram");
const express = require("express");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const { Server } = require("socket.io");
const port = 3005;

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
  },
});
io.on("connection", (socket) => {
  console.log(`a user connected: ${socket.id}`);
  socket.on("join_room", ({ user, room }) => {
    socket.join(room);
  });
  socket.on("send_msg", ({ user, room, message }) => {
    const d = { user: user, message: message };
    socket.to(room).emit("receive_msg", d);
  });
});
server.listen(port, () => {
  console.log(`listening on ${port}`);
});
