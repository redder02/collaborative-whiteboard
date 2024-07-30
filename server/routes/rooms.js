const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.post('/create', async (req, res) => {
  const { roomId } = req.body;
  const room = new Room({ roomId, drawingData: [] });
  await room.save();
  res.status(201).json(room);
});

router.get('/:roomId', async (req, res) => {
  const { roomId } = req.params;
  const room = await Room.findOne({ roomId });
  if (!room) {
    return res.status(404).json({ message: 'Room not found' });
  }
  res.status(200).json(room);
});

module.exports = router;
