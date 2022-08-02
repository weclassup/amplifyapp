import React from "react";
import ReactDOM from "react-dom";

import "@methodstudio/class-component-module/lib/cjs/theme/class.styles.css";
import "./styles/index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
