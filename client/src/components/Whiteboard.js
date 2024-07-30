import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../styles/Whiteboard.css';

const socket = io('http://localhost:5000');

const Whiteboard = () => {
  const { roomId } = useParams();
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);
  const [lastPos, setLastPos] = useState(null);

  useEffect(() => {
    socket.emit('join-room', roomId);

    socket.on('load-drawing', (data) => {
      // const canvas = canvasRef.current;
      // const context = canvas.getContext('2d');
      // data.forEach(draw => {
      //   context.beginPath();
      //   context.moveTo(draw.start.x, draw.start.y);
      //   context.lineTo(draw.end.x, draw.end.y);
      //   context.stroke();
      // });
    });

    socket.on('drawing', (data) => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      console.log(`drawing in ${socket.id}`);
      // socket.emit('drawing', data);
      context.beginPath();
      context.moveTo(data.start.x, data.start.y);
      context.lineTo(data.end.x, data.end.y);
      context.stroke();
      // socket.emit('load-drawing', data);
      
    });
  }, [roomId]);

  const handleMouseDown = (e) => {
    setDrawing(true);
    const canvas = canvasRef.current;
    setCtx(canvas.getContext('2d'));
    setLastPos({ x: e.clientX - canvas.getBoundingClientRect().left, y: e.clientY - canvas.getBoundingClientRect().top });
  };

  const handleMouseUp = () => {
    setDrawing(false);
    setLastPos(null);
  };

  const handleMouseMove = (e) => {
    if (!drawing) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const newPos = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
    const data = {
      start: lastPos,
      end: newPos
    };

    
    socket.emit('drawing', data);
    ctx.beginPath();
    ctx.moveTo(data.start.x, data.start.y);
    ctx.lineTo(data.end.x, data.end.y);
    ctx.stroke();
    setLastPos(newPos);
    // socket.emit('drawing', data);
  };

  return (
    <div className="whiteboard-container">
      <h2>Room: {roomId}</h2>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        style={{ border: '1px solid black' }}
      />
    </div>
  );
};

export default Whiteboard;
