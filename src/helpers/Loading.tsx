import React from "react";
import { Box } from "@mui/material";
import { PacmanLoader } from "react-spinners";

const Loading: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          background: "black",
          opacity: "0.7",
          paddingTop: "25%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <PacmanLoader
          style={{ color: "white", opacity: "1" , zIndex:9999999}}
          color={"white"}
          id={"refresh"}
        />
      </Box>
    </>
  );
};
export default Loading;
