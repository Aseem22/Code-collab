import React from "react";

// import { useStore } from "../src/store";
import JoinRoom from "./components/JoinRoom";

const App = () => {
  // const username = useStore(({ username }) => username);

  return (
    <>
      <JoinRoom />
    </>
  );
};

export default App;

// import React, { useState } from "react";
// // import JoinRoom from "./components/JoinRoom";
// import Editor from "./components/Editor";

// const App = () => {
//   const [roomId, setRoomId] = useState(null);

//   const handleJoin = (roomId) => {
//     setRoomId(roomId);
//   };

//   return (
//     <div>
//       {/* {roomId ? <Editor roomId={roomId} /> : <JoinRoom onJoin={handleJoin} />} */}
//       <Editor />
//     </div>
//   );
// };

// export default App;

// import React from "react";
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from "react-router-dom";
// import Home from "./components/Home";
// import Editor from "./components/Editor";

// const App = () => (
//   <BrowserRouter>
//     <Routes>
//       <Route path="/" element={Home} />
//       <Route path="/room/:roomId/:username" element={EditorWrapper} />
//     </Routes>
//   </BrowserRouter>
// );

// const EditorWrapper = ({ match }) => {
//   const { roomId, username } = match.params;
//   return <Editor roomId={roomId} username={username} />;
// };

// export default App;
