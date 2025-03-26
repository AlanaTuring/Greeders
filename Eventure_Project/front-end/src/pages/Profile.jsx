import React, { useState } from "react";
import profilePic from "../assets/profile-pic.png";  // Import your profile picture
import backgroundImage from "../assets/GreenOval.jpg"; // Import the GreenOval background image

const Profile = () => {
  const [events, setEvents] = useState([
    "Tech Talk with Industry Experts",
    "Workshop on AI",
  ]);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Transparent Overlay */}
      <h1 style={styles.header}>Profile</h1>

      {/* Profile Section */}
      <div style={styles.profileSection}>
        <div style={styles.profileImageContainer}>
          {/* Profile Image */}
          <img
            src={profilePic}  // Use the imported profile image
            alt="Profile"
            style={styles.profileImage}
          />
        </div>
        <div style={styles.profileInfo}>
          <h2 style={styles.username}>Hayat</h2> {/* Replace with dynamic username if needed */}
        </div>
      </div>

      {/* Events List Section */}
      <h2 style={styles.eventsTitle}>My Events</h2>
      <ul style={styles.eventsList}>
        {events.map((event, index) => (
          <li key={index} style={styles.eventItem}>
            {event}
          </li>
        ))}
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
    backgroundImage: `url(${backgroundImage})`, // Set GreenOval.jpg as background
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
  profileImageContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    overflow: "hidden",
    marginRight: "20px",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
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
    margin: "5px 0",
    fontSize: "18px",
    color: "white",
  },
};

export default Profile;
