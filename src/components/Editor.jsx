import React, { useState, useEffect, useRef } from "react";
import { useStore } from "../store";
import { EditorView, basicSetup } from "codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { oneDark } from "@codemirror/theme-one-dark";
import io from "socket.io-client";
import { Stack, Paper } from "@mui/material";
import "../App.css";

const Editor = () => {
  const [users, setUsers] = useState([]);
  const { username, roomId } = useStore((state) => ({
    username: state.username,
    roomId: state.roomId,
  }));
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const socketRef = useRef(null);
  const lastCodeSentByMe = useRef("");

  useEffect(() => {
    socketRef.current = io("http://localhost:3001/", {
      transports: ["websocket"],
    });

    if (editorRef.current) {
      viewRef.current = new EditorView({
        doc: "",
        extensions: [
          basicSetup,
          javascript(),
          oneDark,
          EditorView.updateListener.of((update) => {
            if (update.docChanged) {
              const newCode = update.state.doc.toString();
              lastCodeSentByMe.current = newCode;
              socketRef.current.emit("CODE_CHANGED", {
                code: newCode,
                username,
              });
            }
          }),
        ],
        parent: editorRef.current,
      });
    }

    const socket = socketRef.current;

    socket.on("CODE_CHANGED", ({ code, sender }) => {
      if (
        sender !== username &&
        viewRef.current &&
        code !== lastCodeSentByMe.current
      ) {
        viewRef.current.dispatch({
          changes: {
            from: 0,
            to: viewRef.current.state.doc.length,
            insert: code,
          },
        });
      }
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    socket.on("connect", () => {
      socket.emit("CONNECTED_TO_ROOM", { roomId, username });
    });

    socket.on("disconnect", () => {
      socket.emit("DISCONNECT_FROM_ROOM", { roomId, username });
    });

    socket.on("ROOM:CONNECTION", (users) => {
      setUsers(users);
      console.log(users);
    });

    return () => {
      socket.emit("DISCONNECT_FROM_ROOM", { roomId, username });
      socket.disconnect();
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, [roomId, username]);

  return (
    <>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
      >
        <Paper>Your username is: {username}</Paper>
        <Paper>The room ID is: {roomId}</Paper>
        <Paper> How many people are connected: {users.length}</Paper>
      </Stack>

      <div ref={editorRef} className="editor-container" />
    </>
  );
};

export default Editor;
