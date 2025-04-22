import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/AUB.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEventForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [clubId, setClubId] = useState('');
  const [entityType, setEntityType] = useState('');

  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    time: '',
    form: ''
  });

  useEffect(() => {
    const email = localStorage.getItem('userEmail');
    if (!email) {
      setError('User not logged in');
      toast.error('User not logged in');
      setLoading(false);
      return;
    }

    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/organizers/${email}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch organizer');
        return res.json();
      })
      .then(data => {
        if (!data.managing || !data.type) {
          throw new Error('Organizer not managing any entity');
        }
        setClubId(data.managing._id);
        setEntityType(data.type.toLowerCase());
      })
      .catch(err => {
        setError(err.message);
        toast.error(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setEventDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!clubId) return;

    const payload = {
      ...eventDetails,
      club: clubId,
      type: entityType,
      form: eventDetails.form || undefined
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        toast.success('Event added successfully ✅');
        setTimeout(() => navigate('/organizer'), 2000); // allow toast to show
      } else {
        const err = await res.json();
        toast.error(`Error: ${err.message || res.status}`);
      }
    } catch {
      toast.error('Network error ❌');
    }
  };

  if (loading) return (
    <>
      <ToastContainer />
      <div style={styles.pageWrapper}>
        <div style={styles.background}></div>
        <div style={styles.container}>Loading...</div>
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

  return (
    <>
      <ToastContainer />
      <div style={styles.pageWrapper}>
        <div style={styles.background}></div>
        <div style={styles.container}>
          <h2 style={styles.title}>Add Event</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            {['title', 'description', 'date', 'location', 'time'].map(field => (
              <div style={styles.inputGroup} key={field}>
                <label style={styles.label}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                </label>
                {field === 'description' ? (
                  <textarea
                    name={field}
                    value={eventDetails[field]}
                    onChange={handleChange}
                    style={styles.textarea}
                    required
                  />
                ) : (
                  <input
                    type={field === 'date' ? 'date' : field === 'time' ? 'time' : 'text'}
                    name={field}
                    value={eventDetails[field]}
                    onChange={handleChange}
                    style={styles.input}
                    required
                  />
                )}
              </div>
            ))}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Registration URL (optional):</label>
              <input
                type="url"
                name="form"
                value={eventDetails.form}
                onChange={handleChange}
                style={styles.input}
                placeholder="https://..."
              />
            </div>

            <button type="submit" style={styles.button}>Add Event</button>
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
    alignItems: "center"
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
    zIndex: -1
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
    backdropFilter: "blur(2px)"
  },
  title: {
    textAlign: "center",
    color: "#2c3e50",
    fontSize: "28px",
    marginBottom: "30px",
    fontWeight: "bold"
  },
  form: {
    display: "flex",
    flexDirection: "column"
  },
  inputGroup: {
    marginBottom: "20px"
  },
  label: {
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "8px",
    fontSize: "16px"
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    transition: "border-color 0.3s"
  },
  textarea: {
    padding: "12px",
    fontSize: "16px",
    border: "2px solid #ccc",
    borderRadius: "8px",
    width: "100%",
    height: "120px",
    transition: "border-color 0.3s"
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
    marginTop: "20px"
  }
};

export default AddEventForm;
