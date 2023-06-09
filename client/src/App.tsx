import './App.css';

import { useState } from 'react';
import { connect } from 'socket.io-client';

import Chat from './Chat';

const socket = connect("http://localhost:3000");

function App(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [showChat, setShowChat] = useState<boolean>(false);

  const joinRoom = (): void => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="John..."
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(event) => setRoom(event.target.value)}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat
          socket={socket}
          username={username}
          room={room}
        />
      )}
    </div>
  );
}

export default App;
