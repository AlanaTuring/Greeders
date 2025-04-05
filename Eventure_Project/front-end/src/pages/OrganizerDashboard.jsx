import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const OrganizerDashboard = () => {
  const organizerId = '67d5f07768a0a99eb8dbdfbe';
  const [organizer, setOrganizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hoveredEventId, setHoveredEventId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5001/api/organizers/${organizerId}`)
      .then((response) => response.json())
      .then((data) => {
        setOrganizer(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch organizer data');
        setLoading(false);
      });
  }, [organizerId]);

  const handleDeleteEvent = (eventId) => {
    fetch(`http://localhost:5001/api/events/${eventId}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete event');
        }
        setOrganizer((prev) => ({
          ...prev,
          managing: {
            ...prev.managing,
            events: prev.managing.events.filter((event) => event._id !== eventId),
          },
        }));
      })
      .catch(() => alert('Error deleting event'));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const clubData = organizer.managing;
  const events = clubData?.events;

  return (
    <div style={styles.dashboardContainer}>
      <h2>{clubData?.name}</h2>
      <img src={clubData?.logo} alt={`${clubData?.name} logo`} style={styles.clubLogo} />
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
                {/* Edit Button */}
                <button
                  style={{ ...styles.actionButton, ...(hoveredEventId === event._id && styles.buttonHover) }}
                  onClick={() => navigate(`/edit-event/${event._id}`)}
                  onMouseEnter={() => setHoveredEventId(event._id)}
                  onMouseLeave={() => setHoveredEventId(null)}
                >
                  Edit
                </button>
                
                {/* Delete Button */}
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
  clubLogo: {
    width: '100px',
    borderRadius: '10px',
    margin: '10px 0',
  },
  button: {
    padding: '15px 30px',
    backgroundColor: '#923152',  // Burgundy color
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
    backgroundColor: '#ad3a59', // Lighter burgundy color
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
  }
};

export default OrganizerDashboard;
