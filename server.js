const express = require('express')
const app = express()

const PORT = process.env.PORT || 3030
const server = app.listen(PORT, () => console.log(`Listening on ${PORT}\n`))

const messages = [
  {
    channel: "1",
    account: "0x8dA3dA022d7a5224615c8F2E3fFdDc5B883B24A2",
    text: "Welcome to Altcord!"
  },
  {
    channel: "2",
    account: "0x8dA3dA022d7a5224615c8F2E3fFdDc5B883B24A2",
    text: "Welcome to the Market Channel! Here you can talk about the market!"
  },
]

const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "http://altcord.com:3000"
  }
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('get messages', () => {
    io.emit('get messages', messages)
  })

  socket.on('new message', (msg) => {
    messages.push(msg)
    io.emit('new message', messages)
  })
})
