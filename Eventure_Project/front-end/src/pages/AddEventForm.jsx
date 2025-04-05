import React, { useState } from 'react';

const AddEventForm = ({ onAddEvent }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    time: '',
    club: '', // Ensure this is populated with the club ID from the parent
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Sending Event Data:", eventDetails); // Debugging Step 1

    try {
      const response = await fetch('http://localhost:5001/api/events', { // Updated to correct backend URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });

      console.log("Response Status:", response.status); // Debugging Step 2

      if (response.ok) {
        const newEvent = await response.json();
        console.log("Server Response:", newEvent); // Debugging Step 3
        onAddEvent(newEvent); // Update state in parent component

        alert("Event added successfully! ✅"); // Show success message

        setEventDetails({
          title: '',
          date: '',
          location: '',
          description: '',
          time: '',
          club: '',
        });
      } else {
        console.error("Error: Event not added. Check backend.");
        alert("Error adding event ❌");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      alert("Network Error ❌");
    }
  };

  return (
    <div style={styles.formContainer}>
      <h2>Add Event</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Event Title:</label>
          <input
            type="text"
            name="title"
            value={eventDetails.title}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Date:</label>
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Location:</label>
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Description:</label>
          <textarea
            name="description"
            value={eventDetails.description}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Time:</label>
          <input
            type="text"
            name="time"
            value={eventDetails.time}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.inputContainer}>
          <label style={styles.label}>Club ID (for validation):</label>
          <input
            type="text"
            name="club"
            value={eventDetails.club}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.submitButton}>Add Event</button>
      </form>
    </div>
  );
};

// Styling for the form page
const styles = {
  formContainer: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    marginBottom: '10px',
    boxSizing: 'border-box',
  },
  submitButton: {
    padding: '12px 20px',
    backgroundColor: '#923152', // Burgundy color
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '18px',
    transition: 'background-color 0.3s ease',
    width: '100%',
  },
};

export default AddEventForm;
