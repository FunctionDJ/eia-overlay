import React from "react";

const LoaderOverlay: React.FC = () => {
  return (
    <div style={{
      position: "absolute",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 99,
      width: "100%",
      height: "100%",
      backgroundColor: "hsla(0, 0%, 0%, 0.7)",
      color: "white",
      userSelect: "none"
    }}>
      Loading data from nodecg...
    </div>
  );
};

export default LoaderOverlay;
