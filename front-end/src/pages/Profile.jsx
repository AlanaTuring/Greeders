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
          credentials: "include", // Include cookies (if you're using sessions)
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
        // Update UI by removing the deleted event
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
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <h1 style={styles.header}>Profile</h1>

      <div style={styles.profileSection}>
        <div style={styles.profileInfo}>
          <h2 style={styles.username}>{name}</h2>
        </div>
      </div>

      <h2 style={styles.eventsTitle}>My Events</h2>
      <ul style={styles.eventsList}>
        {events.length > 0 ? (
          events.map((event, index) => (
            <li key={index} style={styles.eventItem}>
              <strong>{event.title}</strong>
              <br />
              {event.description}
              <br />
              🕒 {formatDate(event.date)} | 📍 {event.location}
              <br />
              <button
                style={styles.deleteButton}
                onClick={() => handleDelete(event._id)}
              >
                ❌ Remove
              </button>
            </li>
          ))
        ) : (
          <li>No events available.</li>
        )}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    width: "100%",
    backgroundColor: "rgba(148, 172, 196, 0.8)",
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    minHeight: "100vh",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(148, 172, 196, 0.5)",
    zIndex: 1,
  },
  header: {
    fontSize: "80px",
    marginBottom: "30px",
    fontFamily: "Impact, fantasy",
    color: "white",
    zIndex: 2,
    position: "relative",
  },
  profileSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "40px",
    zIndex: 2,
    position: "relative",
  },
  profileInfo: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  username: {
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
  },
  eventsTitle: {
    fontSize: "30px",
    color: "white",
    fontWeight: "bold",
    marginBottom: "20px",
    zIndex: 2,
    position: "relative",
  },
  eventsList: {
    listStyleType: "none",
    padding: 0,
    zIndex: 2,
    position: "relative",
  },
  eventItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "10px",
    borderRadius: "5px",
    margin: "10px 0",
    fontSize: "18px",
    color: "white",
    lineHeight: "1.6",
  },
  deleteButton: {
    marginTop: "10px",
    padding: "6px 12px",
    backgroundColor: "#ff4d4f",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Profile;
