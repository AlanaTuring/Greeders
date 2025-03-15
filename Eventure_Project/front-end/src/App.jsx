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
        <nav style={styles.navbar}>
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
