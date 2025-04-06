import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/Societies/Societies";
import SocietiesPage from "./pages/Societies/societiesPage"; 
import Faculties from "./pages/Faculties/Faculties";
import FacultiesPage from "./pages/Faculties/FacultiesPage"; 
import Clubs from "./pages/Clubs/Clubs";
import ClubPage from "./pages/Clubs/ClubPage"; 
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div>
        {/* Injecting CSS styles at the end of the DOM */}
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
          <Link to="/clubs" style={styles.navLink}>Clubs</Link>
          <Link to="/societies" style={styles.navLink}>Societies</Link>
          <Link to="/faculties" style={styles.navLink}>Faculties</Link>
          <Link to="/profile" style={styles.navLink}>Profile</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/:id" element={<ClubPage />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/societies/:id" element={<SocietiesPage />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/faculties/:id" element={<FacultiesPage />} />
          <Route path="/profile" element={<Profile />} />
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
    backgroundColor: "rgba(0, 0, 0, 0.001)", // Transparent background
    padding: "15px 0",
    fontFamily: "Arial, sans-serif",
  },
  
  navLink: {
    textDecoration: "none",
    color: "#a9a9af",
    fontSize: "21px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "0 15px",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
  },
};

export default App;
