import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/SocietiesTemp";
import Faculties from "./pages/Faculties";
import Clubs from "./pages/Clubs/Clubs";
import IEEE from "./pages/Clubs/IEEE";
import Profile from "./pages/Profile"; // Import Profile page

function App() {
  return (
    <Router>
      <div>
        <nav style={styles.navbar}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/clubs" style={styles.navLink}>Clubs</Link>
          <Link to="/clubs/ieee" style={styles.navLink}>IEEE</Link>
          <Link to="/societies" style={styles.navLink}>Societies</Link>
          <Link to="/faculties" style={styles.navLink}>Faculties</Link>
          <Link to="/profile" style={styles.navLink}>Profile</Link> {/* Add Profile link */}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clubs" element={<Clubs />} />
          <Route path="/clubs/ieee" element={<IEEE />} />
          <Route path="/societies" element={<Societies />} />
          <Route path="/faculties" element={<Faculties />} />
          <Route path="/profile" element={<Profile />} /> {/* Add Profile route */}
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
