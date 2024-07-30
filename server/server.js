const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
const roomRoutes = require('./routes/rooms');
const Room = require('./models/Room');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());
app.use('/api/rooms', roomRoutes);

mongoose.connect('mongodb+srv://tech:P3G6PVCAodzvKlkA@org360.znx0neg.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

io.on('connection', (socket) => {
  console.log('a user connected:', socket.id);

  socket.on('join-room', async (roomId) => {
    socket.join(roomId);

    const room = await Room.findOne({ roomId });
    if (room) {
      socket.emit('load-drawing', room.drawingData);
      // io.to(roomId).emit('load-drawing', room.drawingData);
    } else {
      await Room.create({ roomId, drawingData: [] });
    }

    // socket.on('drawing', async (data) => {
    //   io.to(roomId).emit('drawing', data);

    //   await Room.updateOne({ roomId }, { $push: { drawingData: data } });
    // });
    socket.on('drawing',  async (data) => {
      const roomId = Array.from(socket.rooms).filter((item) => item !== socket.id)[0];
      io.to(roomId).emit('drawing', data);
      // io.to(roomId).emit('load-drawing', room.drawingData);
      await Room.updateOne({ roomId }, { $push: { drawingData: data } });
    });
    socket.on('disconnect', () => {
      console.log('user disconnected:', socket.id);
    });
  });
});

server.listen(5000, () => {
    console.log('listening on *:5000');
});
  
