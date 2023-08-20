import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import Calculator from "./Calculator";
import AppContext from "./AppContext";
import reducer from "./reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AppContext reducer={reducer}>
    <Calculator />
  </AppContext>
  // </React.StrictMode>
);
