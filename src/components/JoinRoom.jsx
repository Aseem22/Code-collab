import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Editor from "./Editor";
import { TextField, Button, Typography, Tooltip } from "@mui/material";

const JoinRoom = () => {
  const [roomId, setRoomId] = useState("");
  const [userName, setUserName] = useState("");
  const [joined, setJoined] = useState(false);

  const joinRoom = () => {
    if (!userName) {
      return;
    }
    if (!roomId) {
      setRoomId(uuidv4());
    }
    setJoined(true);
  };

  return (
    <div style={{ backgroundColor: "#f1f0f0" }}>
      {!joined ? (
        <div>
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Welcome To Code Collab
          </Typography>
          <Typography variant="h6" mt="10px" sx={{ textAlign: "center" }}>
            {" "}
            Collaborative Coding Made Easy
          </Typography>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              position: "fixed",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "400px",
            }}
          >
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userName}
              required
              onChange={(e) => setUserName(e.target.value)}
            />
            <Tooltip
              placement="right-end"
              title="Enter room ID or leave empty to create a new room"
            >
              <TextField
                label="RoomID"
                variant="outlined"
                fullWidth
                margin="normal"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
              />
            </Tooltip>

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
