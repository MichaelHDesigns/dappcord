const express = require('express');
const app = express();

const PORT = process.env.PORT || 3030;
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`));

const users = [];
const messages = [];

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://altcord.com:3000"
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('get users', () => {
    io.emit('get users', users);
  })

  socket.on('new user', (user) => {
    users.push(user);
    io.emit('new user', user);
  })

  socket.on('get messages', () => {
    io.emit('get messages', messages);
  })

  socket.on('new message', (message) => {
    messages.push(message);
    io.emit('new message', message);
  })
});
