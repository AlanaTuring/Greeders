import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { UserProvider, UserContext } from "./context/userContext"; // Ensure correct path
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword"; // Import ResetPassword
import Societies from "./pages/Societies/Societies";
import SocietiesPage from "./pages/Societies/societiesPage";
import Faculties from "./pages/Faculties/Faculties";
import FacultiesPage from "./pages/Faculties/FacultiesPage";
import Clubs from "./pages/Clubs/Clubs";
import ClubPage from "./pages/Clubs/ClubPage";
import Profile from "./pages/Profile";
import Organizer from "./pages/Organizer";

function App() {
  const { isLoggedIn, logout } = useContext(UserContext); // Access UserContext

  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.navLink}>Home</Link>
          {/* Only show Clubs, Societies, and Faculties links if the user is logged in */}
          {isLoggedIn && (
            <>
              <Link to="/clubs" style={styles.navLink}>Clubs</Link>
              <Link to="/societies" style={styles.navLink}>Societies</Link>
              <Link to="/faculties" style={styles.navLink}>Faculties</Link>
            </>
          )}

          {/* Show links based on login status */}
          {isLoggedIn && (
            <>
              <Link to="/profile" style={styles.navLink}>Profile</Link>
              <Link to="/organizer" style={styles.navLink}>Organizer</Link>
              <button onClick={logout} style={styles.navLink}>Logout</button>
            </>
          )}

          {!isLoggedIn && (
            <>
              <Link to="/login" style={styles.navLink}>Login</Link>
              <Link to="/signup" style={styles.navLink}>Signup</Link>
            </>
          )}
        </nav>

        <Routes>
          {/* Protect the Home page as well */}
          <Route path="/" element={isLoggedIn ? <Home /> : <Navigate to="/login" />} />
          
          {/* Add isLoggedIn check for Clubs, Societies, and Faculties */}
          <Route path="/clubs" element={isLoggedIn ? <Clubs /> : <Navigate to="/login" />} />
          <Route path="/clubs/:clubId" element={isLoggedIn ? <ClubPage /> : <Navigate to="/login" />} />
          <Route path="/societies" element={isLoggedIn ? <Societies /> : <Navigate to="/login" />} />
          <Route path="/societies/:id" element={isLoggedIn ? <SocietiesPage /> : <Navigate to="/login" />} />
          <Route path="/faculties" element={isLoggedIn ? <Faculties /> : <Navigate to="/login" />} />
          <Route path="/faculties/:id" element={isLoggedIn ? <FacultiesPage /> : <Navigate to="/login" />} />
          
          {/* Protected routes */}
          <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/organizer" element={isLoggedIn ? <Organizer /> : <Navigate to="/login" />} />

          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} /> {/* Forgot Password Route */}
          <Route path="/reset-password/:userId" element={<ResetPassword />} /> {/* Reset Password Route */}
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#923152",
    padding: "15px 0",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "0 15px",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
  },
};

export default App;
