import React, { createContext, useState } from 'react';

// Create UserContext
const UserContext = createContext();

// Create UserProvider component to manage the context state
const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") === "true");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || "");

  // Login function
  const login = (token, email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem("isLoggedIn", "true");
    if (token) localStorage.setItem("userToken", token);
    if (email) localStorage.setItem("userEmail", email);
  };

  // Logout function
  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userEmail");
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, login, logout, userEmail }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
