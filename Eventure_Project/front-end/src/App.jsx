import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/SocietiesTemp";
import Faculties from "./pages/Faculties";
import Clubs from "./pages/Clubs/Clubs";
import IEEE from "./pages/Clubs/IEEE";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";

function App() {
  const [role, setRole] = useState(null);

  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <Router>
      <div>
        {/* Role Selection Page */}
        {!role ? (
          <div style={styles.roleSelection}>
            <h2>Select your role:</h2>
            <button style={styles.button} onClick={() => handleSelectRole("student")}>
              Student
            </button>
            <button style={styles.button} onClick={() => handleSelectRole("organizer")}>
              Organizer
            </button>
          </div>
        ) : (
          <>
            <nav style={styles.navbar}>
              <Link to="/" style={styles.navLink}>Home</Link>
              <Link to="/clubs" style={styles.navLink}>Clubs</Link>
              <Link to="/clubs/ieee" style={styles.navLink}>IEEE</Link>
              <Link to="/societies" style={styles.navLink}>Societies</Link>
              <Link to="/faculties" style={styles.navLink}>Faculties</Link>
              <Link to="/profile" style={styles.navLink}>Profile</Link>
            </nav>

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/clubs" element={<Clubs />} />
              <Route path="/clubs/ieee" element={<IEEE />} />
              <Route path="/societies" element={<Societies />} />
              <Route path="/faculties" element={<Faculties />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/dashboard"
                element={role === "student" ? <StudentDashboard /> : <OrganizerDashboard />}
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
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
  roleSelection: {
    textAlign: "center",
    marginTop: "20%",
  },
  button: {
    margin: "10px",
    padding: "15px 30px",
    backgroundColor: "#923152",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "18px",
  },
};

export default App;
