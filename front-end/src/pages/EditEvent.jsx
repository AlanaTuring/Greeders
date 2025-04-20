import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditEvent = () => {
  const { eventId } = useParams();  // Extract eventId from URL params
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch event data using the eventId from the URL
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch event data. Status: ${response.status}`);
        }

        const data = await response.json();

        // Ensure time is in "HH:mm" format
        let formattedTime = data.time;
        if (formattedTime && formattedTime.length > 5) {
          formattedTime = formattedTime.slice(0, 5);
        }

        setEvent({
          ...data,
          time: formattedTime,
        });

        setLoading(false);
      } catch (error) {
        setError("Failed to fetch event data.");
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    } else {
      setError("Invalid event ID.");
      setLoading(false);
    }
  }, [eventId]);

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  // Handle form submission and update the event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(event),
      });

      if (!response.ok) {
        throw new Error(`Failed to update event. Status: ${response.status}`);
      }

      alert("Event updated successfully!");
      navigate(`/events/${eventId}`);  // Navigate to the event page after successful update
    } catch (error) {
      console.error(error);
      alert("Failed to update event. Check console for details.");
    }
  };

  if (loading) return <div>Loading event data...</div>;
  if (error) return <div>{error}</div>;
  if (!event) return <div>No event found.</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Edit Event</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>Title:</label>
        <input
          type="text"
          name="title"
          value={event.title || ""}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Description:</label>
        <textarea
          name="description"
          value={event.description || ""}
          onChange={handleInputChange}
          style={styles.textarea}
          required
        />

        <label style={styles.label}>Club:</label>
        <input
          type="text"
          name="club"
          value={event.club || ""}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Date:</label>
        <input
          type="date"
          name="date"
          value={event.date ? event.date.substring(0, 10) : ""}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Location:</label>
        <input
          type="text"
          name="location"
          value={event.location || ""}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Time:</label>
        <input
          type="time"
          name="time"
          value={event.time || ""}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Form:</label>
        <input
          type="text"
          name="form"
          value={event.form || ""}
          onChange={handleInputChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>Save Changes</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#800020",
    fontSize: "24px",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#800020",
  },
  input: {
    padding: "10px",
    marginBottom: "15px",
    border: "2px solid #800020",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
  },
  textarea: {
    padding: "10px",
    marginBottom: "15px",
    border: "2px solid #800020",
    borderRadius: "5px",
    fontSize: "16px",
    width: "100%",
    height: "80px",
  },
  button: {
    padding: "12px",
    backgroundColor: "#800020",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    fontSize: "18px",
    cursor: "pointer",
    textAlign: "center",
    marginTop: "10px",
  },
};

export default EditEvent;
