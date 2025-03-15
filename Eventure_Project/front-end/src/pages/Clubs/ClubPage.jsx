import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; 
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const ClubPage = () => {
  const { id } = useParams();
  const [club, setClub] = useState(null);
  const [date, setDate] = useState(new Date());
  const [eventsForDate, setEventsForDate] = useState([]);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    fetch(`http://localhost:5001/api/clubs/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched club data:", data); // Debugging line
        setClub(data);
      })
      .catch((error) => console.error("Error fetching club data:", error));
  }, [id]);

  useEffect(() => {
    if (club && club.events) {
      const formattedDate = formatDate(date);
      const filteredEvents = club.events.filter(
        (event) => formatDate(new Date(event.date)) === formattedDate
      );
      setEventsForDate(filteredEvents);
    }
  }, [date, club]);

  if (!club) return <div>Loading...</div>;

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `url(/pics/${club.logo})`,

      }}
    >
      <div style={styles.overlay}></div>
      <h1 style={styles.header}>{club.name}</h1>

      <div style={styles.card}>
        <p style={styles.description}>{club.description}</p>
      </div>

      <h2 style={styles.calendarTitle}>Upcoming Events</h2>
      <div style={styles.calendarContainer}>
        <Calendar onChange={setDate} value={date} />
      </div>

      <div style={styles.eventList}>
        <h3>Events on {formatDate(date)}:</h3>
        {eventsForDate.length > 0 ? (
          <ul>
            {eventsForDate.map((event, index) => (
              <li key={index}>{event.title}</li>
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
    backgroundColor: "rgba(148, 172, 196, 0.8)",
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
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "15px",
    maxWidth: "600px",
    margin: "0 auto 20px",
    zIndex: 2,
  },
  description: {
    color: "black",
    fontSize: "25px",
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

export default ClubPage;
