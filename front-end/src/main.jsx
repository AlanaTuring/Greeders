import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UserProvider } from "./context/userContext";

// ✅ Import Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

// (Optional) Import Bootstrap JS if you're using modals, dropdowns, etc.
// import "bootstrap/dist/js/bootstrap.bundle.min";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
