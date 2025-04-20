import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
  const [organizer, setOrganizer] = useState(null);
  const [entityData, setEntityData] = useState(null); // Holds club/society/faculty data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const navigate = useNavigate();

  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    if (!userEmail) {
      setError("User is not logged in.");
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/organizers/${userEmail}`)  
      .then((response) => response.json())
      .then((data) => {
        setOrganizer(data);
        const { managing, type } = data; // managing is the ID, type is club/society/faculty

        console.log("Organizer Data:", data);  // Debugging log for organizer data
        console.log("Managing Entity:", managing);  // Debugging log for managing entity ID
        console.log("Entity Type:", type);  // Debugging log for type field

        if (!managing) {
          setError("This organizer is not managing any entity.");
          setLoading(false);
          return;
        }

        // Map type to the correct endpoint
        const endpoints = {
          club: 'clubs',
          society: 'societies',
          faculty: 'faculties',
        };

        // Normalize type to lowercase to handle any case inconsistencies
        const normalizedType = type?.toLowerCase();

        if (!endpoints[normalizedType]) {
          setError("Invalid entity type.");
          setLoading(false);
          return;
        }

        // Fetch data for the appropriate entity (club/society/faculty)
        const fetchEntityData = async () => {
          try {
            const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/${endpoints[normalizedType]}/${managing._id}`);
            if (res.ok) {
              const entity = await res.json();
              setEntityData(entity);
            } else {
              setError(`Could not find the managed ${type}.`);
            }
          } catch (err) {
            setError('Failed to fetch entity data.');
          } finally {
            setLoading(false);
          }
        };

        fetchEntityData();
      })
      .catch(() => {
        setError('Failed to fetch organizer data');
        setLoading(false);
      });
  }, [userEmail]);

  const handleDeleteEvent = (eventId) => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events/${eventId}`, {  
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) throw new Error('Failed to delete event');

        setEntityData((prev) => ({
          ...prev,
          events: prev.events.filter((event) => event._id !== eventId),
        }));
      })
      .catch(() => alert('Error deleting event'));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const events = entityData?.events;

  return (
    <div style={styles.dashboardContainer}>
      <h2>{entityData?.name}</h2>

      {entityData?.logo && (
        <img
          src={`/pics/${entityData.logo}`}
          alt={`${entityData.name} logo`}
          style={styles.entityLogo}
        />
      )}

      <h3>Manage Events</h3>

      <Link to="/add-event">
        <button
          style={{ ...styles.button, ...(hoveredEventId === 'add' && styles.buttonHover) }}
          onMouseEnter={() => setHoveredEventId('add')}
          onMouseLeave={() => setHoveredEventId(null)}
        >
          Add Event
        </button>
      </Link>

      <h4>Upcoming Events</h4>
      <ul style={styles.eventsList}>
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <li key={event._id} style={styles.eventItem}>
              <h5>{event.title}</h5>
              <p>{event.description}</p>
              <div style={styles.eventButtons}>
                <button
                  style={{ ...styles.actionButton, ...(hoveredEventId === event._id && styles.buttonHover) }}
                  onClick={() => navigate(`/edit-event/${event._id}`)}
                  onMouseEnter={() => setHoveredEventId(event._id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                >
                  Edit
                </button>
                <button
                  style={{ ...styles.actionButton, ...(hoveredEventId === event._id && styles.buttonHover) }}
                  onClick={() => handleDeleteEvent(event._id)}
                  onMouseEnter={() => setHoveredEventId(event._id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p>No upcoming events available.</p>
        )}
      </ul>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    padding: '20px',
    textAlign: 'center',
  },
  entityLogo: {
    width: '100px',
    borderRadius: '10px',
    margin: '10px 0',
  },
  button: {
    padding: '15px 30px',
    backgroundColor: '#923152',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '10px 0',
    transition: 'all 0.3s ease-in-out',
    width: '200px',
  },
  buttonHover: {
    backgroundColor: '#ad3a59',
  },
  eventsList: {
    listStyleType: 'none',
    padding: 0,
  },
  eventItem: {
    borderBottom: '1px solid #ddd',
    marginBottom: '10px',
    paddingBottom: '10px',
  },
  eventButtons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  actionButton: {
    backgroundColor: '#ad3a59',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default OrganizerDashboard;