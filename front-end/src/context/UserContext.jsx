import React, { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    const storedRole = localStorage.getItem("role");
    const storedToken = localStorage.getItem("userToken");
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (storedEmail && storedRole && storedToken && loggedIn) {
      setUserEmail(storedEmail);
      setRole(storedRole);
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token, email, userRole) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    setRole(userRole);
    setToken(token);

    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("role", userRole);
    if (token) localStorage.setItem("userToken", token);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setRole("");
    setToken("");

    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("role");
    localStorage.removeItem("userToken");
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        userEmail,
        role,
        setRole,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
