import React from "react";

import Editor from "./components/Editor";
import EnterForm from "./components/EnterForm";
import { useStore } from "../src/store";
import JoinButton from "./components/JoinButton";

const App = () => {
  // const username = useStore(({ username }) => username);

  return (
    <>
      <JoinButton />
      <Editor />
    </>
  );
};

export default App;
