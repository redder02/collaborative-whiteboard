import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [roomId, setRoomId] = useState('');
  const navigate = useNavigate();

  const createRoom = () => {
    const id = Math.random().toString(36).substring(2, 10);
    navigate(`/room/${id}`);
  };

  const joinRoom = () => {
    if (roomId) {
      navigate(`/room/${roomId}`);
    }
  };

  return (
    <div className="home-container">
      <h1>Collaborative Whiteboard</h1>
      <button onClick={createRoom}>Create Room</button>
      <input 
        type="text" 
        placeholder="Enter Room ID" 
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)} 
      />
      <button onClick={joinRoom}>Join Room</button>
    </div>
  );
};

export default Home;
