import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { UserProvider, UserContext } from "./context/userContext";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Societies from "./pages/Societies/Societies";
import SocietiesPage from "./pages/Societies/societiesPage";
import Faculties from "./pages/Faculties/Faculties";
import FacultiesPage from "./pages/Faculties/FacultiesPage";
import Clubs from "./pages/Clubs/Clubs";
import ClubPage from "./pages/Clubs/ClubPage";
import Profile from "./pages/Profile";
import Organizer from "./pages/Organizer";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext);

  return (
    <Router>
      <div>
        {/* Injecting slide-in animation styles */}
        <style>
          {`
            @keyframes slideIn {
              from {
                transform: translateX(-100%);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }

            .animated-navbar {
              animation: slideIn 1.5s ease-out forwards;
              opacity: 0;
            }
          `}
        </style>

        <nav style={styles.navbar} className="animated-navbar">
          <Link to="/" style={styles.navLink}>Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/clubs" style={styles.navLink}>Clubs</Link>
              <Link to="/societies" style={styles.navLink}>Societies</Link>
              <Link to="/faculties" style={styles.navLink}>Faculties</Link>
            </>
          )}
          {isLoggedIn ? (
            <>
              <Link to="/profile" style={styles.navLink}>Profile</Link>
              <Link to="/organizer" style={styles.navLink}>Organizer</Link>
              <button onClick={logout} style={styles.navLink}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/signup" style={styles.navLink}>Signup</Link>
            </>
          )}

          
        </nav>

        <Routes>
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          <Route path="/clubs" element={isLoggedIn ? <Clubs /> : <Navigate to="/login" />} />
          <Route path="/clubs/:clubId" element={isLoggedIn ? <ClubPage /> : <Navigate to="/login" />} />
          <Route path="/societies" element={isLoggedIn ? <Societies /> : <Navigate to="/login" />} />
          <Route path="/societies/:id" element={isLoggedIn ? <SocietiesPage /> : <Navigate to="/login" />} />
          <Route path="/faculties" element={isLoggedIn ? <Faculties /> : <Navigate to="/login" />} />
          <Route path="/faculties/:id" element={isLoggedIn ? <FacultiesPage /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/organizer" element={isLoggedIn ? <Organizer /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:userId" element={<ResetPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    position: "absolute", // Put it on top
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10, // Stay above the video
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // Transparent background
    padding: "15px 0",
    fontFamily: "Arial, sans-serif",
  },
  
  navLink: {
    textDecoration: "none",
    color: "#ffffff",
    fontSize: "21px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "0 15px",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
  },
};

export default App;
