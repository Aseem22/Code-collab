import React, { useState } from "react";
import EnterForm from "./EnterForm";
import { Button } from "@mui/material";

function JoinButton() {
  const [clickJoin, setClickjoin] = useState(false);

  return (
    <div>
      {clickJoin ? (
        <div>
          <EnterForm />
          <Button
            sx={{ color: "black" }}
            onClick={() => setClickjoin((prev) => !prev)}
            variant="outlined"
          >
            Close
          </Button>
        </div>
      ) : (
        <div>
          <Button
            sx={{ color: "black" }}
            onClick={() => setClickjoin((prev) => !prev)}
            variant="outlined"
          >
            Join a Room
          </Button>
        </div>
      )}
    </div>
  );
}

export default JoinButton;
