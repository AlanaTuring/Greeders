import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/SocietiesTemp";
import Faculties from "./pages/Faculties";
import Clubs from "./pages/Clubs/Clubs";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import EventManagement from "./pages/EventManagement";
import AddEventForm from "./pages/AddEventForm"; // Import the AddEventForm component
import EditEvent from "./pages/EditEvent"; // Import the EditEvent component

const App = () => {
  const [role, setRole] = useState(null); // Student or Organizer
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [clubData, setClubData] = useState(null); // Data for the club/society/faculty
  const [events, setEvents] = useState([]); // Events state
  const [message, setMessage] = useState(""); // Message state for actions
  const [isHovered, setIsHovered] = useState(false); // Hover state for button

  // Load saved role from localStorage or set to null if not found
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
    setLoading(false); // Stop loading once the role is loaded
  }, []);

  // Fetch organizer data based on email
  const fetchOrganizerData = (email) => {
    setLoading(true);
    setTimeout(() => {
      const mockData = {
        club: "IEEE",
        logo: "/path/to/ieee-logo.png",
        events: [
          { _id: 1, title: "Event 1", description: "Event 1 description" },
          { _id: 2, title: "Event 2", description: "Event 2 description" },
        ],
      };
      setClubData(mockData);
      setEvents(mockData.events);
      setLoading(false);
    }, 2000);
  };

  // Handle role selection
  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);
    
    if (selectedRole === "organizer") {
      fetchOrganizerData("organizer@example.com"); // Replace with actual email
    } else {
      setLoading(false); // If student, stop loading
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    setClubData(null);
    setLoading(false);
  };

  // Function to add event to the event list
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]); // Update the events list with the new event
  };

  // Function to edit an existing event
  const handleEditEvent = (updatedEvent) => {
    setEvents((prevEvents) => prevEvents.map((event) => 
      event._id === updatedEvent._id ? updatedEvent : event
    ));
  };

  return (
    <Router>
      <div>
        {/* Role Selection Page */}
        {role === null && !loading ? (
          <div style={styles.roleSelection}>
            <h2>Select your role:</h2>
            <button 
              style={{ ...styles.button, ...(isHovered && styles.buttonHover) }} 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => handleSelectRole("student")}
            >
              Student
            </button>
            <button 
              style={{ ...styles.button, ...(isHovered && styles.buttonHover) }} 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => handleSelectRole("organizer")}
            >
              Organizer
            </button>
          </div>
        ) : (
          <>
            <nav style={styles.navbar}>
              <Link to="/" style={styles.navLink}>Home</Link>
              {role === "student" && (
                <>
                  <Link to="/clubs" style={styles.navLink}>Clubs</Link>
                  <Link to="/societies" style={styles.navLink}>Societies</Link>
                  <Link to="/faculties" style={styles.navLink}>Faculties</Link>
                </>
              )}
              <Link to="/profile" style={styles.navLink}>Profile</Link>
              <button style={styles.logoutButton} onClick={handleLogout}>Logout</button>
            </nav>

            <Routes>
              {/* Routes for student */}
              {role === "student" && (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/clubs" element={<Clubs />} />
                  <Route path="/societies" element={<Societies />} />
                  <Route path="/faculties" element={<Faculties />} />
                </>
              )}

              {/* Routes for organizer */}
              {role === "organizer" && (
                <Route
                  path="/home"
                  element={loading ? (
                    <div style={styles.loadingMessage}>Loading your club/society/faculty data...</div>
                  ) : (
                    <OrganizerDashboard clubData={clubData} events={events} />
                  )}
                />
              )}

              {/* Route for Add Event Form */}
              <Route
                path="/add-event"
                element={<AddEventForm onAddEvent={handleAddEvent} />} // Pass onAddEvent function here
              />

              {/* Route for Edit Event Form */}
              <Route
                path="/edit-event/:eventId"
                element={<EditEvent events={events} onEditEvent={handleEditEvent} />} // Pass onEditEvent function here
              />

              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to={role === "student" ? "/" : "/home"} />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#923152",  // Burgundy color for the navbar
    padding: "15px 0",
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
    display: "flex",
    flexDirection: "column",  // Align buttons vertically
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    margin: "10px",
    padding: "15px 30px",
    backgroundColor: "#923152", // Burgundy color
    color: "white",
    border: "none",
    borderRadius: "8px", // Rounded corners for buttons
    cursor: "pointer",
    fontSize: "18px",
    transition: "all 0.3s ease-in-out", // Smooth hover effect
    width: "250px", // Set a fixed width for consistency
  },
  buttonHover: {
    backgroundColor: "#ad3a59", // Lighter burgundy color on hover
    transform: "scale(1.05)",  // Slight scale-up effect
  },
  logoutButton: {
    backgroundColor: "#f44336", // Red for logout button
    color: "white",
    border: "none",
    borderRadius: "8px", // Rounded corners for logout button
    cursor: "pointer",
    fontSize: "16px",
    padding: "12px 25px",
    marginLeft: "15px",
    transition: "all 0.3s ease-in-out",
  },
  loadingMessage: {
    textAlign: "center",
    fontSize: "18px",
    color: "#923152",  // Burgundy color for the loading message
    marginTop: "20%",
  },
};

export default App;
