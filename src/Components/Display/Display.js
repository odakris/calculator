import React from "react";
import "./display.scss";

function Display({ state }) {
  console.log({ state });
  return (
    <div id="display">
      <p className="previous">
        {state.previous} {state.operation}
      </p>
      <p className="current">{state.current}</p>
    </div>
  );
}

export default Display;
