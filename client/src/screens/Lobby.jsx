import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSocket } from "../context/SocketProvider";
import styles from "./Lobby.module.css"; // Import CSS module

const LobbyScreen = () => {
  const [email, setEmail] = useState("");
  const [room, setRoom] = useState("");

  const socket = useSocket();
  // console.log(socket)
  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
      console.log(email , room);
      socket.emit("room:join", { email, room });
      console.log("Hello world");
    },
    [email, room, socket]
  );

  const handleJoinRoom = useCallback(
    (data) => {
      console.log(data);
      const { email, room } = data;
      navigate(`/room/${room}`);
    },
    [navigate]
  );

  useEffect(() => {
    socket.on("room:join", handleJoinRoom);
    return () => {
      socket.off("room:join", handleJoinRoom);
    };
  }, [socket, handleJoinRoom]);

  return (
    <div className={styles.lobbyContainer}>
      <h1 className={styles.title}>Join a Room</h1>
      <form onSubmit={handleSubmitForm} className={styles.form}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email ID</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="room">Room Number</label>
          <input
            type="text"
            id="room"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.joinButton}>
          Join
        </button>
      </form>
    </div>
  );
};

export default LobbyScreen;
