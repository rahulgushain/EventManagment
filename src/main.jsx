import React, { StrictMode } from "react";  // ✅ Import React properly
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ContextFun from "./Components/Context.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <StrictMode>
  <BrowserRouter>
  <ContextFun>
  <Toaster/>
      <App />
      </ContextFun>
      </BrowserRouter>
  </StrictMode>
);
