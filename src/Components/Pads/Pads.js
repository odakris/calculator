import React from "react";
import Data from "../../Data/Data";
import Pad from "../Pad/Pad";
import "./pads.scss";

function Pads({ dispatch }) {
  return (
    <div id="pads">
      {Data.map((item) => (
        <Pad
          key={item.key}
          id={item.id}
          value={item.value}
          type={item.type}
          keycode={item.keycode}
          dispatch={dispatch}
        />
      ))}
    </div>
  );
}

export default Pads;
