import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Editor from "./Editor";
import { TextField, Button } from "@mui/material";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (!roomId) {
      setRoomId(uuidv4());
    }
    setJoined(true);
  };

  return (
    <div style={{ backgroundColor: "#f1f0f0" }}>
      {!joined ? (
        <div
          style={{
            position: "fixed",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            maxWidth: "400px",
          }}
        >
          <form>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <TextField
              label="Email"
              placeholder="Enter room ID or leave empty to create a new room"
              variant="outlined"
              fullWidth
              margin="normal"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              onClick={joinRoom}
            >
              Join Room
            </Button>
          </form>
        </div>
      ) : (
        <Editor roomId={roomId} userName={userName} />
      )}
    </div>
  );
};

export default JoinRoom;
