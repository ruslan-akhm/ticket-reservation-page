import React from "react";
import ReactDOM from "react-dom";
import { SeatsProvider } from "./context/seatsContext";
import App from "./App";

ReactDOM.render(
  <SeatsProvider>
    <App />
  </SeatsProvider>,
  document.getElementById("root")
);
