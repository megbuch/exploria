import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./pages/App/App.jsx";
import { BrowserRouter as Router } from "react-router-dom";
// import { IconContext } from "react-icons";
import { ParksProvider } from "./global/contexts/parksContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <IconContext.Provider value={{ className: "react-icons" }}> */}
    <ParksProvider>
      <Router>
        <App />
      </Router>
    </ParksProvider>
    {/* </IconContext.Provider> */}
  </React.StrictMode>
);
