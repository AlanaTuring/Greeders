import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/userContext";  // Import the UserProvider
import "./index.css"; // Ensure you add global styles

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>  {/* Wrap App with UserProvider to provide the context */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
