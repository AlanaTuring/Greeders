import React, { useEffect, useState } from "react";
import backgroundImage from "../assets/GreenOval.jpg";

// Helper function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
};

const Profile = () => {
  const [name, setName] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const res = await fetch("http://localhost:5001/api/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        const data = await res.json();
        setName(data.name);
        setEvents(data.events);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleDelete = async (eventId) => {
    const token = localStorage.getItem("userToken");
    try {
      const res = await fetch(`http://localhost:5001/api/bookmarks/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setEvents((prevEvents) =>
          prevEvents.filter((event) => event._id !== eventId)
        );
      } else {
        console.error("Failed to delete event:", data.message);
      }
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div>
      {/* TOP SECTION with background image */}
      <div style={styles.topSection}>
        <div style={styles.overlay}></div>
        <h1 style={styles.header}>My Events</h1>
        <div style={styles.profileInfo}>
          <h2 style={styles.username}>{name}</h2>
        </div>
      </div>

      {/* BOTTOM SECTION with solid background */}
      <div style={styles.bottomSection}>
        <ul style={styles.eventsList}>
          {events.length > 0 ? (
            events.map((event, index) => (
              <li key={index} style={styles.eventItem}>
                <div style={styles.eventContent}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDescription}>{event.description}</p>
                  <p>
                    🕒 {formatDate(event.date)} <br  />
                      📍 {event.location}
                  </p>
                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDelete(event._id)}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No events available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  topSection: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(102, 152, 200, 0.4)",
    zIndex: 1,
  },
  header: {
    fontSize: "100px",
    fontFamily: "copperplate, fantasy",
    color: "white",
    zIndex: 2,
    margin: 0,
  },
  profileInfo: {
    zIndex: 2,
    marginTop: "10px",
  },
  username: {
    color: "white",
    fontSize: "45px",
    fontWeight: "bold",
  },
  bottomSection: {
    backgroundColor: "#e2e8f0",
    padding: "40px 20px",
    minHeight: "100vh",
    textAlign: "center",
  },
  eventsList: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  eventItem: {
    backgroundColor: "#ffffff",
    padding: "25px 20px 20px 20px",
    borderRadius: "20px",
    width: "340px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    textAlign: "left",
    position: "relative", // Needed for absolute ❌ positioning
    fontSize: "25px", // Apply consistent font size to content
    lineHeight: "1.6",
  },
  eventTitle: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  eventDescription: {
    fontSize: "25px",
    marginBottom: "15px",
  },
  eventContent: {
    color: "#333",
    position: "relative",
    marginTop: "0px"
  },
  deleteButton: {
    position: "absolute",
    top: "1px", // very close to top
    right: "1px", // very close to right edge
    backgroundColor: "transparent",
    color: "#e53e3e",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    zIndex: 5,
  },
};


export default Profile;
