import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import backgroundImage from '../assets/AUB.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch event data. Status: ${response.status}`);
        }

        const data = await response.json();

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
        toast.error("Failed to fetch event data ❌");
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    } else {
      setError("Invalid event ID.");
      toast.error("Invalid event ID ❌");
      setLoading(false);
    }
  }, [eventId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

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

      toast.success("Event updated successfully! ✅");
      setTimeout(() => navigate('/organizer'), 2000);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update event. Check console for details ❌");
    }
  };

  if (loading) return (
    <>
      <ToastContainer />
      <div style={styles.pageWrapper}>
        <div style={styles.background}></div>
        <div style={styles.container}>Loading event data...</div>
      </div>
    </>
  );

  if (error) return (
    <>
      <ToastContainer />
      <div style={styles.pageWrapper}>
        <div style={styles.background}></div>
        <div style={styles.container}>{error}</div>
      </div>
    </>
  );

  if (!event) return (
    <>
      <ToastContainer />
      <div style={styles.pageWrapper}>
        <div style={styles.background}></div>
        <div style={styles.container}>No event found.</div>
      </div>
    </>
  );

  return (
    <>
      <ToastContainer />
      <div style={styles.pageWrapper}>
        <div style={styles.background}></div>
        <div style={styles.container}>
          <h2 style={styles.title}>Edit Event</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Title:</label>
              <input
                type="text"
                name="title"
                value={event.title || ""}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Description:</label>
              <textarea
                name="description"
                value={event.description || ""}
                onChange={handleInputChange}
                style={styles.textarea}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Date:</label>
              <input
                type="date"
                name="date"
                value={event.date ? event.date.substring(0, 10) : ""}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Location:</label>
              <input
                type="text"
                name="location"
                value={event.location || ""}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Time:</label>
              <input
                type="time"
                name="time"
                value={event.time || ""}
                onChange={handleInputChange}
                style={styles.input}
                required
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Form:</label>
              <input
                type="text"
                name="form"
                value={event.form || ""}
                onChange={handleInputChange}
                style={styles.input}
              />
            </div>

            <button type="submit" style={styles.button}>Save Changes</button>
          </form>
        </div>
      </div>
    </>
  );
};

const styles = {
  pageWrapper: {
    position: "relative",
    minHeight: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    filter: "blur(4px)",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1,
  },
  container: {
    zIndex: 1,
    width: "80%",
    maxWidth: "600px",
    margin: "40px auto",
    padding: "30px",
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    borderRadius: "15px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    fontFamily: "Arial, sans-serif",
    backdropFilter: "blur(2px)",
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "28px",
    marginBottom: "30px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  inputGroup: {
    marginBottom: "20px",
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "8px",
    fontSize: "16px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    transition: "border-color 0.3s",
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    height: "120px",
    transition: "border-color 0.3s",
  },
  button: {
    padding: "14px",
    backgroundColor: "#3498db",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "18px",
    cursor: "pointer",
    textAlign: "center",
    transition: "background-color 0.3s",
    marginTop: "20px",
  },
};

export default EditEvent;
