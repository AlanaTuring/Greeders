import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import EditEvent from './pages/EditEvent';  // Import EditEvent component
// Page imports
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
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AddEventForm from "./pages/AddEventForm"; // Use AddEventForm directly

// UserContext import
import { UserContext } from "./context/userContext";
import { UserProvider } from "./context/userContext";

const App = () => {
  const { isLoggedIn, logout, role, setRole } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(true);
  const [clubData, setClubData] = useState(null);
  const [events, setEvents] = useState([]);

  const userEmail = localStorage.getItem("userEmail");

  const fetchOrganizerData = async (email) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5001/api/organizer/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setClubData(data.club);
        setEvents(data.events);
      } else {
        console.error("Error fetching organizer data", data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    setClubData(null);
    setLoading(false);
    navigate("/login");
  };

  const showNavbar = isLoggedIn && location.pathname !== "/login" && location.pathname !== "/signup";

  useEffect(() => {
    if (role === "organizer" && userEmail) {
      fetchOrganizerData(userEmail);
    }
  }, [role, userEmail]);

  return (
    <div>
      {showNavbar && (
        <nav style={styles.navbar}>
          {role === "student" && (
            <>
              <Link to="/home" style={styles.navLink}>Home</Link>
              <Link to="/clubs" style={styles.navLink}>Clubs</Link>
              <Link to="/societies" style={styles.navLink}>Societies</Link>
              <Link to="/faculties" style={styles.navLink}>Faculties</Link>
              <Link to="/profile" style={styles.navLink}>Profile</Link>
              <button onClick={handleLogout} style={styles.navLink}>Logout</button>
            </>
          )}
          {role === "organizer" && (
            <>
              <Link to="/home" style={styles.navLink}>Home</Link> {/* Categories homepage */}
              <Link to="/organizer" style={styles.navLink}>Organizer Dashboard</Link>
              
              <Link to="/profile" style={styles.navLink}>Profile</Link>
              <button onClick={handleLogout} style={styles.navLink}>Logout</button>
            </>
          )}
        </nav>
      )}

      <Routes>
     

        {/* Root Route */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" /> : <Navigate to="/login" />} />
        <Route path="/edit-event/:eventId" element={<EditEvent />} /> {/* Your EditEvent route */}
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />

        {/* Home page shared by student and organizer */}
        <Route path="/home" element={isLoggedIn && role ? <Home /> : <Navigate to="/login" />} />

        {/* Profile */}
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />

        {/* Organizer Dashboard */}
        <Route path="/organizer" element={
          isLoggedIn && role === "organizer" ? (
            loading ? <div>Loading...</div> : <OrganizerDashboard clubData={clubData} events={events} />
          ) : (
            <Navigate to="/login" />
          )
        } />

        {/* Add Event */}
        <Route path="/add-event" element={isLoggedIn && role === "organizer" ? <AddEventForm /> : <Navigate to="/login" />} /> {/* Add Event route */}

        {/* Entity Pages */}
        <Route path="/clubs/:clubId" element={<ClubPage />} />
        <Route path="/faculties/:id" element={<FacultiesPage />} />
        <Route path="/societies/:id" element={<SocietiesPage />} />

        {/* Lists */}
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/societies" element={<Societies />} />
        <Route path="/faculties" element={<Faculties />} />
      </Routes>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#923152",
    padding: "15px 0",
    flexWrap: "wrap",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "5px 10px",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
    backgroundColor: "#923152",
    border: "none",
    cursor: "pointer",
  },
};

export default () => (
  <UserProvider>
    <App />
  </UserProvider>
);
