import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./pages/App/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { ParksProvider } from "./providers/ParksProvider.jsx";
import "./global/index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ParksProvider>
      <Router>
        <App />
      </Router>
    </ParksProvider>
  </React.StrictMode>
);
