import React from "react";

const EventManagement = ({ events, setEvents }) => {
  const [message, setMessage] = useState(""); // To store message when no events are available

  // If no events exist, show message
  useEffect(() => {
    if (events.length === 0) {
      setMessage("No events available");
    } else {
      setMessage(""); // Clear message if there are events
    }
  }, [events]);

  const handleDeleteEventClick = (eventId) => {
    console.log(`Deleting event with ID: ${eventId}`);
    // Simulate backend call to delete the event
    setEvents(events.filter((event) => event._id !== eventId)); // Remove deleted event from frontend
  };

  const handleEditEventClick = (eventId) => {
    console.log(`Editing event with ID: ${eventId}`);
    // Handle the editing logic here, maybe redirect to an edit page
  };

  const handleAddEventClick = () => {
    console.log("Adding a new event");
    // Simulate adding an event to the frontend
    const newEvent = {
      _id: Math.random().toString(36).substr(2, 9), // Random ID for simulation
      title: "New Event",
      description: "Description of new event",
    };
    setEvents([...events, newEvent]); // Add new event to frontend
    setMessage(""); // Clear message
  };

  return (
    <div style={styles.container}>
      <h2>Managing Events</h2>

      {/* Display events or message */}
      {message && <p>{message}</p>}

      {events.length > 0 ? (
        events.map((event) => (
          <div key={event._id} style={styles.eventItem}>
            <p>{event.title}</p>
            <button
              style={styles.button}
              onClick={() => handleEditEventClick(event._id)}
            >
              Edit Event
            </button>
            <button
              style={styles.button}
              onClick={() => handleDeleteEventClick(event._id)}
            >
              Delete Event
            </button>
          </div>
        ))
      ) : (
        <div>
          <button style={styles.button} onClick={handleAddEventClick}>
            Add Event
          </button>
          <p>No events available</p> {/* Message if no events */}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
  },
  eventItem: {
    margin: "10px 0",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#923152",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px",
  },
};

export default EventManagement;
