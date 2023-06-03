import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import { AuthProvider } from "./contexts/AuthProvider.js";
import { BrowserRouter } from "react-router-dom";
import ResetStyle from "./styles/ResetStyle.js";
import GlobalStyle from "./styles/GlobalStyle.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ResetStyle />
      <GlobalStyle />
        <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
        </AuthProvider>
  </React.StrictMode>
);
