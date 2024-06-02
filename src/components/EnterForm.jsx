import React, { useRef } from "react";
import { TextField, Button, InputAdornment, useTheme } from "@mui/material";
import { useMutation } from "react-query";
import { useStore } from "../store";
import axios from "axios";

const EnterForm = () => {
  const inputRef = useRef();
  const roomIdRef = useRef();
  const theme = useTheme();
  const { setUsername, setRoomId } = useStore(({ setUsername, setRoomId }) => ({
    setUsername,
    setRoomId,
  }));

  const { mutateAsync } = useMutation(({ username, roomId, uri }) => {
    return axios.post(`http://localhost:3001/${uri}`, {
      username,
      roomId,
    });
  });

  const showToast = (message, severity) => {
    // You can use any toast library, e.g., react-toastify, notistack, etc.
    console.log(`${severity}: ${message}`);
  };

  const createRoom = async () => {
    const value = inputRef.current?.value;

    if (!value) {
      showToast("Please enter your username", "error");
      return;
    }

    await mutateAsync(
      { username: value, uri: "create-room-with-user" },
      {
        onSuccess: ({ data }) => {
          setRoomId(data.roomId);
          showToast(
            "We created your username, you will find yourself in a room. Share the room id with anyone",
            "success"
          );
        },
      }
    );

    setUsername(value);
  };

  const enterRoom = async () => {
    const value = inputRef.current?.value;
    const roomIdValue = roomIdRef.current?.value;

    if (!value || !roomIdValue) {
      showToast("Please enter text in both inputs", "error");
      return;
    }

    setRoomId(roomIdValue);
    setUsername(value);
  };

  return (
    <>
      <TextField
        label="Enter your name"
        variant="outlined"
        inputRef={inputRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                sx={{ backgroundColor: "black" }}
                variant="contained"
                onClick={createRoom}
              >
                Go!
              </Button>
            </InputAdornment>
          ),
        }}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Enter a room id"
        variant="outlined"
        inputRef={roomIdRef}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button
                sx={{ backgroundColor: "black" }}
                variant="contained"
                onClick={enterRoom}
              >
                Join!
              </Button>
            </InputAdornment>
          ),
        }}
        fullWidth
        margin="normal"
      />
    </>
  );
};

export default EnterForm;
