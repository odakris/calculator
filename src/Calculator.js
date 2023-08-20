import React from "react";
import Display from "./Components/Display/Display";
import Pads from "./Components/Pads/Pads";
import { useGlobalContext } from "./AppContext";

function Calculator() {
  const [state, dispatch] = useGlobalContext();
  const [{ credit }] = useGlobalContext();

  return (
    <>
      <div className="container">
        <Display state={state} />
        <Pads dispatch={dispatch} />
      </div>
      <p id="credit">
        {credit}{" "}
        <a
          href="https://github.com/odakris"
          target="_blank"
          rel="noreferrer noopener"
        >
          Odakris
        </a>
      </p>
    </>
  );
}

export default Calculator;
