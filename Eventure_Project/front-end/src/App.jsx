import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Societies from "./pages/SocietiesTemp";
import Faculties from "./pages/Faculties";
import Clubs from "./pages/Clubs/Clubs";
import IEEE from "./pages/Clubs/IEEE";
import Profile from "./pages/Profile";
import StudentDashboard from "./pages/StudentDashboard";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import EventManagement from "./pages/EventManagement";
import AddEventForm from "./pages/AddEventForm"; // Import your AddEventForm component

const App = () => {
  const [role, setRole] = useState(null); // Student or Organizer
  const [loading, setLoading] = useState(true); // Loading state for fetching data
  const [clubData, setClubData] = useState(null); // Data for the club
  const [events, setEvents] = useState([]); // State to store the events
  const [message, setMessage] = useState(""); // Message state for actions

  // Load saved role and organizerPage from localStorage
  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) setRole(savedRole);

    if (savedRole === "organizer") {
      fetchClubData();
    } else {
      setLoading(false);
    }
  }, []);

  // Function to fetch mock data for the club
  const fetchClubData = () => {
    setLoading(true);
    setTimeout(() => {
      // Mock data for the club (this could be an API call in real apps)
      const mockClubData = {
        name: "IEEE",
        logo: "/path/to/ieee-logo.png",
        events: [
          { _id: 1, title: "Event 1", description: "Event 1 description" },
          { _id: 2, title: "Event 2", description: "Event 2 description" },
        ],
      };
      setClubData(mockClubData); // Set the fetched data
      setEvents(mockClubData.events); // Set the initial events data
      setLoading(false); // Set loading to false after fetching
    }, 2000); // Simulate API call delay
  };

  // Function to handle the addition of a new event
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setMessage("Event added successfully!");
  };

  // Function to handle editing an event
  const handleEditEvent = (eventId, updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event._id === eventId ? { ...event, ...updatedEvent } : event
      )
    );
    setMessage("Event updated successfully!");
  };

  // Function to handle deleting an event
  const handleDeleteEvent = (eventId) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event._id !== eventId));
    setMessage("Event deleted successfully!");
  };

  // Handle role selection
  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);

    // Fetch club data if role is organizer
    if (selectedRole === "organizer") {
      setClubData(null);
      setLoading(true);
      fetchClubData(); // Fetch club data for the organizer role
    } else {
      setLoading(false); // Stop loading when it's a student
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("role");
    setRole(null);
    setClubData(null);
    setLoading(false);
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
              {/* Route for home page */}
              {role === "student" && <Route path="/" element={<Home />} />}
              {role === "organizer" && <Route path="/" element={<Navigate to="/home" />} />}

              {/* Organizer Dashboard with Loading Handling */}
              {role === "organizer" && (
                <Route
                  path="/home"
                  element={loading ? (
                    <div>Loading club data...</div>
                  ) : (
                    <OrganizerDashboard clubData={clubData} />
                  )}
                />
              )}

              {/* Event Management Page for Organizer */}
              {role === "organizer" && !loading && (
                <Route
                  path="/home/events"
                  element={<EventManagement events={events} setEvents={setEvents} />}
                />
              )}

              {/* Add Event Form for Organizer */}
              {role === "organizer" && !loading && (
                <Route
                  path="/home/events/add"
                  element={<AddEventForm onAddEvent={handleAddEvent} />}
                />
              )}

              {/* Routes for student dashboard */}
              {role === "student" && (
                <>
                  <Route path="/clubs" element={<Clubs />} />
                  <Route path="/clubs/ieee" element={<IEEE />} />
                  <Route path="/societies" element={<Societies />} />
                  <Route path="/faculties" element={<Faculties />} />
                </>
              )}

              <Route path="/profile" element={<Profile />} />
              <Route path="*" element={<Navigate to={role === "student" ? "/" : "/home"} />} />
            </Routes>
          </>
        )}
        
        {/* Always show these buttons for event management */}
        {role === "organizer" && (
          <div>
            <button onClick={() => setMessage("Add Event clicked")}>Add Event</button>
            <button onClick={() => handleEditEvent(1, { title: "Updated Event", description: "Updated description" })}>Edit Event</button>
            <button onClick={() => handleDeleteEvent(1)}>Delete Event</button>

            {/* Show message */}
            {message && <p>{message}</p>}

            {/* Show events if available */}
            {events.length > 0 ? (
              <div>
                <h2>Event List</h2>
                <ul>
                  {events.map((event) => (
                    <li key={event._id}>
                      {event.title}
                      <button onClick={() => handleEditEvent(event._id, { title: "Updated Event", description: "Updated description" })}>Edit</button>
                      <button onClick={() => handleDeleteEvent(event._id)}>Delete</button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No events available</p>
            )}
          </div>
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
  logoutButton: {
    backgroundColor: "#f44336", // Red color
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    padding: "10px 20px",
    marginLeft: "15px",
    transition: "all 0.3s ease-in-out",
  }
};

export default App;
