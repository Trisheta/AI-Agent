// server.js
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(path.join(__dirname, "public")));

io.on("connection", (socket) => {
  socket.on("call-user", (data) => {
    io.to(data.to).emit("call-made", { offer: data.offer, from: socket.id });
  });

  socket.on("make-answer", (data) => {
    io.to(data.to).emit("answer-made", {
      answer: data.answer,
      from: socket.id,
    });
  });

  socket.on("send-ice-candidate", (data) => {
    io.to(data.to).emit("ice-candidate", {
      candidate: data.candidate,
      from: socket.id,
    });
  });

  socket.on("register", (id) => {
    socket.join(id);
  });
});

server.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
