const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: String,
  drawingData: Array
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
