import React, { StrictMode } from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const rootElement = document.getElementById("root");

if (rootElement) {
  if (rootElement.hasChildNodes()) {
    console.log("Hydrating");
    hydrateRoot(
      rootElement,
      <BrowserRouter basename="/">
        <App />
      </BrowserRouter>
    );
  }
}
