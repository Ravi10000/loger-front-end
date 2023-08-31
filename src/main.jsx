import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./fonts.css";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import AuthWindowProvider from "#contexts/auth-window-context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthWindowProvider>
        <App />
      </AuthWindowProvider>
    </BrowserRouter>
  </React.StrictMode>
);
