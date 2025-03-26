import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ieeeLogo from "../../assets/ieee-logo.png"; // Correct import for the logo image

const events = {
  "2025-03-15": ["Tech Talk with Industry Experts", "Workshop on AI"],
  "2025-03-20": ["IEEE Coding Challenge"],
  "2025-03-25": ["Annual IEEE Conference"],
  // Add more events here...
};

const IEEE = () => {
  const [date, setDate] = useState(new Date());
  const [eventsForDate, setEventsForDate] = useState([]);
  
  // Function to format the date as 'YYYY-MM-DD'
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Normalize the selected date (set the time to midnight)
  const normalizeDate = (date) => {
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0); // Set time to midnight
    return normalizedDate;
  };

  // Track and update events for the selected date
  useEffect(() => {
    const normalizedDate = normalizeDate(date);
    const formattedDate = formatDate(normalizedDate);
    setEventsForDate(events[formattedDate] || []);
  }, [date]);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Transparent Overlay */}
      <h1 style={styles.header}>IEEE Club</h1>

      {/* Card Section */}
      <div style={styles.card}>
        <p style={styles.description}>
          The AUB IEEE Club aims to arouse student interest in science, engineering, and
          technology through various programs, conferences, and other fun activities.
        </p>
      </div>

      {/* Calendar Section */}
      <h2 style={styles.calendarTitle}>Upcoming Events</h2>
      <div style={styles.calendarContainer}>
        <Calendar onChange={setDate} value={date} />
      </div>

      {/* Event List */}
      <div style={styles.eventList}>
        <h3>Events on {formatDate(date)}:</h3>
        {eventsForDate.length > 0 ? (
          <ul>
            {eventsForDate.map((event, index) => (
              <li key={index}>{event}</li>
            ))}
          </ul>
        ) : (
          <p>No events scheduled.</p>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    width: "100%",
    backgroundColor: "rgba(148, 172, 196, 0.8)", // Changed background color
    backgroundImage: `url(${ieeeLogo})`, // Set IEEE logo as background
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
    backgroundColor: "rgba(148, 172, 196, 0.5)", // Adjusted overlay color
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
  card: {
    backgroundColor: "#3f5c92", // Changed description box color
    padding: "20px",
    borderRadius: "15px",
    maxWidth: "600px",
    margin: "0 auto 20px",
    zIndex: 2,
  },
  description: {
    color: "white",
    fontSize: "20px",
    lineHeight: "1.5",
  },
  calendarTitle: {
    color: "white",
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
    zIndex: 2,
    position: "relative",
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
    zIndex: 2,
    position: "relative",
  },
  eventList: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: "15px",
    borderRadius: "10px",
    maxWidth: "400px",
    margin: "0 auto",
    zIndex: 2,
    position: "relative",
  },
};

export default IEEE;
