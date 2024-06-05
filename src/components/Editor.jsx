import React, { useEffect, useRef, useState } from "react";
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { yCollab } from "y-codemirror.next";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { javascript } from "@codemirror/lang-javascript";
import * as random from "lib0/random";
import { Stack, Paper } from "@mui/material";

export const usercolors = [
  { color: "#30bced", light: "#30bced33" },
  { color: "#6eeb83", light: "#6eeb8333" },
  { color: "#ffbc42", light: "#ffbc4233" },
  { color: "#ecd444", light: "#ecd44433" },
  { color: "#ee6352", light: "#ee635233" },
  { color: "#9ac2c9", light: "#9ac2c933" },
  { color: "#8acb88", light: "#8acb8833" },
  { color: "#1be7ff", light: "#1be7ff33" },
];

export const userColor = usercolors[random.uint32() % usercolors.length];

const Editor = ({ roomId, userName }) => {
  const editorRef = useRef(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const ydoc = new Y.Doc();
    const provider = new WebsocketProvider(
      `http://localhost:1234/?roomId=${roomId}`,
      roomId,
      ydoc
    );
    const ytext = ydoc.getText("codemirror");
    const undoManager = new Y.UndoManager(ytext);

    provider.awareness.setLocalStateField("user", {
      name: userName,
      color: userColor.color,
      colorLight: userColor.light,
    });

    const updateUsers = () => {
      const awarenessStates = Array.from(
        provider.awareness.getStates().values()
      );
      const users = awarenessStates
        .map((state) => state.user)
        .filter((user) => user);
      setUsers(users);
    };

    provider.awareness.on("change", updateUsers);

    const state = EditorState.create({
      doc: ytext.toString(),
      extensions: [
        basicSetup,
        javascript(),
        yCollab(ytext, provider.awareness, { undoManager }),
      ],
    });

    const view = new EditorView({ state, parent: editorRef.current });

    // Cleanup function
    return () => {
      provider.awareness.setLocalStateField("user", null);
      view.destroy();
      provider.disconnect();
    };
  }, [roomId, userName]);

  return (
    <div>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        style={{ flex: "display", alignItems: "spaceBetween" }}
      >
        <Paper>Your username is: {userName}</Paper>
        <Paper>The room ID is: {roomId}</Paper>
        <Paper> How many people are connected: {users.length}</Paper>
      </Stack>

      <ul>
        {users.map((user, index) => (
          <li key={index} style={{ color: user.color }}>
            {user.name}
          </li>
        ))}
      </ul>

      <div
        ref={editorRef}
        style={{
          maxHeight: "450px",
          overflowY: "scroll",
          minHeight: "400px",
          backgroundColor: "#E7EFF2",
        }}
      />
    </div>
  );
};

export default Editor;
