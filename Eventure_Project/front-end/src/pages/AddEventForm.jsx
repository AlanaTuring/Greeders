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
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventDetails),
      });
      if (response.ok) {
        const newEvent = await response.json();
        onAddEvent(newEvent); // Notify the parent component to update the state
        setEventDetails({
          title: '',
          date: '',
          location: '',
          description: '',
          time: '',
          club: '',
        });
      } else {
        console.error('Error adding event');
      }
    } catch (error) {
      console.error('Error adding event', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Event Title:
        <input
          type="text"
          name="title"
          value={eventDetails.title}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          name="date"
          value={eventDetails.date}
          onChange={handleChange}
        />
      </label>
      <label>
        Location:
        <input
          type="text"
          name="location"
          value={eventDetails.location}
          onChange={handleChange}
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={eventDetails.description}
          onChange={handleChange}
        />
      </label>
      <label>
        Time:
        <input
          type="text"
          name="time"
          value={eventDetails.time}
          onChange={handleChange}
        />
      </label>
      <label>
        Club ID (for validation):
        <input
          type="text"
          name="club"
          value={eventDetails.club}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add Event</button>
    </form>
  );
};

export default AddEventForm;
