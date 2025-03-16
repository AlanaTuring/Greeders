import React from "react";

const OrganizerDashboard = ({ clubData }) => {
  if (!clubData) {
    return <p>Loading club data...</p>;
  }

  return (
    <div style={styles.container}>
      <h1>Welcome, Organizer!</h1>

      {/* Club Section */}
      <div style={styles.clubInfo}>
        <img src={clubData.logo} alt="Club Logo" style={styles.clubLogo} />
        <h2>{clubData.name}</h2>
      </div>

      {/* Event Management Buttons */}
      <div style={styles.buttonContainer}>
        <button style={styles.button}>Add Event</button>
        <button style={styles.button}>Edit Event</button>
        <button style={styles.button}>Delete Event</button>
      </div>

      {/* Events List */}
      <h3>Upcoming Events:</h3>
      {clubData.events.length > 0 ? (
        <ul style={styles.eventList}>
          {clubData.events.map((event) => (
            <li key={event._id} style={styles.eventItem}>
              <strong>{event.title}</strong> - {event.description}
            </li>
          ))}
        </ul>
      ) : (
        <p>No events available.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  clubInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  clubLogo: {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    marginBottom: "10px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#923152",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  eventList: {
    listStyleType: "none",
    padding: 0,
  },
  eventItem: {
    backgroundColor: "#f4f4f4",
    padding: "10px",
    margin: "5px auto",
    borderRadius: "5px",
    maxWidth: "400px",
  },
};

export default OrganizerDashboard;
