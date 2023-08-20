import React, { useState, useEffect } from "react";
import "./pad.scss";

function Pad({ id, value, type, keycode, dispatch }) {
  const [active, setActive] = useState(false);

  const activePad = () => {
    setActive(true);
    setTimeout(() => setActive(false), 100);
  };

  const handleKeyPress = (event) => {
    if (event.which === keycode) {
      dispatch({
        type: { type }.type,
        payload: { input: value },
      });
      activePad();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  });

  const activeKey = active
    ? {
        color: "#FFBF46",
        backgroundColor: "#00c0a3",
      }
    : {
        color: "#4b4453",
        backgroundColor: "#A0AFA0",
      };

  return (
    <div className={id}>
      <button
        id={id}
        className="pad"
        value={value}
        onClick={() => {
          activePad();
          dispatch({
            type: { type }.type,
            payload: { input: value },
          });
        }}
        style={activeKey}
      >
        {value}
      </button>
    </div>
  );
}

export default Pad;
