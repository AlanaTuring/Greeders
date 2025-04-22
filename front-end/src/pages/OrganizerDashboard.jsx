
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/AUB.png';

const OrganizerDashboard = () => {
  const [organizer, setOrganizer] = useState(null);
  const [entityData, setEntityData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
        const { managing, type } = data;
        localStorage.setItem("club_of_organizer", managing);

        if (!managing) {
          setError("This organizer is not managing any entity.");
          setLoading(false);
          return;
        }

        const endpoints = {
          club: 'clubs',
          society: 'societies',
          faculty: 'faculties',
        };

        const normalizedType = type?.toLowerCase();
        if (!endpoints[normalizedType]) {
          setError("Invalid entity type.");
          setLoading(false);
          return;
        }

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
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete event');
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
    <div>
      {/* TOP SECTION */}
      <div style={styles.topSection}>
        <div style={styles.overlay}></div>
        <img
          src={`/pics/${entityData?.logo}`}
          alt="entity logo"
          style={styles.entityLogo}
        />
        <h1 style={styles.entityName}>{entityData?.name}</h1>
      </div>

      {/* BOTTOM SECTION */}
      <div style={styles.bottomSection}>
        <ul style={styles.eventsList}>
          {/* ADD EVENT CARD */}
          <li style={styles.addCard}>
            <Link to="/add-event" style={styles.addLink}>
              <div style={styles.plusSign}>+</div>
              <p style={{ fontSize: '18px', marginTop: '10px' }}>Add Event</p>
            </Link>
          </li>

          {/* EXISTING EVENTS */}
          {Array.isArray(events) && events.length > 0 ? (
            events.map((event) => (
              <li key={event._id} style={styles.eventItem}>
                <div style={styles.eventContent}>
                  <h3 style={styles.eventTitle}>{event.title}</h3>
                  <p style={styles.eventDescription}>{event.description}</p>
                  <p>
                    🕒 {event.time}
                    <br />
                    📍 {event.location}
                  </p>
                  {event.form && (
                    <p>
                      🔗{" "}
                      <a
                        href={event.form}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#3182ce", textDecoration: "underline" }}
                      >
                        Registration Link
                      </a>
                    </p>
                  )}

                  <button
                    style={styles.deleteButton}
                    onClick={() => handleDeleteEvent(event._id)}
                  >
                    ❌
                  </button>
                  <button
                    style={styles.editButton}
                    onClick={() => navigate(`/edit-event/${event._id}`)}
                  >
                    Edit
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>No events available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

const styles = {
  topSection: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
    height: "500px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgb(102, 152, 200, 0.4)",
    zIndex: 1,
  },
  entityLogo: {
    position: "absolute",
    top: "30px",
    right: "30px",
    width: "100px",
    borderRadius: "50%",
    zIndex: 2,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
  },
  entityName: {
    zIndex: 2,
    color: "white",
    fontSize: "70px",
    fontWeight: "bold",
  },
  bottomSection: {
    backgroundColor: "#e2e8f0",
    padding: "40px 20px",
    minHeight: "100vh",
    textAlign: "center",
  },
  eventsList: {
    listStyleType: "none",
    padding: 0,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  },
  addCard: {
    backgroundColor: "#ffffff",
    padding: "25px 20px",
    borderRadius: "20px",
    width: "340px",
    height: "230px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    order: 999,
  },
  addLink: {
    color: "#923152",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "24px",
  },
  plusSign: {
    fontSize: "60px",
    lineHeight: "1",
  },
  eventItem: {
    backgroundColor: "#ffffff",
    padding: "25px 20px 20px 20px",
    borderRadius: "20px",
    width: "340px",
    boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)",
    textAlign: "left",
    position: "relative",
    fontSize: "25px",
    lineHeight: "1.6",
  },
  eventTitle: {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  eventDescription: {
    fontSize: "25px",
    marginBottom: "15px",
  },
  eventContent: {
    color: "#333",
    position: "relative",
    marginTop: "0px"
  },
  deleteButton: {
    position: "absolute",
    top: "1px",
    right: "1px",
    backgroundColor: "transparent",
    color: "#e53e3e",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "15px",
    zIndex: 5,
  },
  editButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#923152",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    cursor: "pointer",
  },
};

export default OrganizerDashboard;
