import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { jwtDecode } from "jwt-decode";
import calendarOverlay from "../../assets/calendar_overlay.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SocietiesPage = () => {
  const { id } = useParams();
  const [society, setSociety] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [bgColor, setBgColor] = useState("rgb(255, 255, 255)");

  useEffect(() => {
    fetch(`http://localhost:5001/api/societies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSociety(data);
        if (data.events) {
          setEvents(
            data.events.map((event) => ({
              id: event._id,
              title: event.title,
              start: event.date,
              description: event.description,
            }))
          );
        }
        if (data.logo) {
          extractColor(`/pics/${data.logo}`);
        }
      })
      .catch((error) => console.error("Error fetching society data:", error));
  }, [id]);

  const extractColor = (imageSrc) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageSrc;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const sampleX = Math.floor(img.width / 2);
      const sampleY = Math.floor(img.height / 2);
      const pixelData = ctx.getImageData(sampleX, sampleY, 1, 1).data;
      const rgbColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      setBgColor(rgbColor);
    };
  };

  const getTokenFromSession = () => {
    return localStorage.getItem("userToken");
  };

  const getStudentIdFromToken = (token) => {
    const decoded = jwtDecode(token);
    return decoded.studentId;
  };

  const bookmarkEvent = async () => {
    const token = getTokenFromSession();
    if (!token) {
      toast.error("You must be logged in to bookmark events.");
      return;
    }

    const studentId = getStudentIdFromToken(token);
    const eventId = selectedEvent.id;

    try {
      const response = await fetch("http://localhost:5001/api/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentId, eventId }),
      });

      if (response.ok) {
        toast.success("Event bookmarked successfully!");
        setModalOpen(false);
      } else {
        const error = await response.json();
        toast.error("Error bookmarking event: " + error.message);
      }
    } catch (error) {
      toast.error("An unexpected error occurred: " + error.message);
    }
  };

  if (!society) return <div>Loading...</div>;

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `linear-gradient(rgba(${bgColor.replace("rgb(", "").replace(")", "")}, 0.7), rgba(${bgColor.replace("rgb(", "").replace(")", "")}, 0.7)), url(${calendarOverlay})`,
      }}
    >
      <ToastContainer />
      <div style={styles.headerContainer}>
        <div style={styles.textContainer}>
          <h1
            style={styles.header}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {society.name}
          </h1>
          <p
            style={{
              ...styles.description,
              opacity: hovered ? 1 : 0,
              visibility: hovered ? "visible" : "hidden",
            }}
          >
            {society.description}
          </p>
        </div>
        <div
          style={{
            ...styles.logo,
            backgroundImage: `url(/pics/${society.logo})`,
          }}
        ></div>
      </div>

      <h2 style={styles.calendarTitle}>Upcoming Events</h2>

      <div style={styles.calendarContainer}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: "prev,next",
            center: "title",
            right: "",
          }}
          eventClick={(info) => setModalOpen(true) || setSelectedEvent(info.event)}
          height="auto"
          aspectRatio={2}
          eventContent={(eventInfo) => (
            <div>
              <span>{eventInfo.event.title}</span>
            </div>
          )}
        />
      </div>

      {modalOpen && (
        <div style={styles.modalOverlay} onClick={() => setModalOpen(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2 style={{ color: "#923152" }}>{selectedEvent?.title}</h2>
            <p style={{ color: "#444" }}>{selectedEvent?.extendedProps?.description}</p>

            <button onClick={() => setModalOpen(false)} style={styles.closeButton}>
              Close
            </button>
            <button onClick={bookmarkEvent} style={styles.bookmarkButton}>
              Bookmark Event
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "left",
    padding: "20px",
    width: "100%",
    minHeight: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundRepeat: "no-repeat",
    transition: "background-color 0.5s ease",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  textContainer: {
    flex: 1,
    textAlign: "left",
  },
  header: {
    fontSize: "80px",
    color: "white",
    textAlign: "left",
    cursor: "pointer",
    marginLeft: "20px",
  },
  description: {
    color: "white",
    fontSize: "25px",
    textAlign: "left",
    opacity: 0,
    visibility: "hidden",
    transition: "opacity 0.3s ease, visibility 0.3s ease",
  },
  calendarTitle: {
    color: "white",
    fontSize: "50px",
    fontWeight: "bold",
    textAlign: "center",
    margin: "30px 0",
  },
  calendarContainer: {
    display: "flex",
    justifyContent: "center",
    width: "90%",
    maxWidth: "1200px",
    margin: "0 auto",
    backgroundColor: "#f8f8f8",
    padding: "20px",
    borderRadius: "10px",
  },
  logo: {
    width: "250px",
    height: "250px",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    marginRight: "70px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "15px",
    width: "400px",
    maxHeight: "80vh",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    wordWrap: "break-word",
    whiteSpace: "normal",
  },
  closeButton: {
    backgroundColor: "#923152",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
    marginRight: "15px",
  },
  bookmarkButton: {
    backgroundColor: "#923152",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default SocietiesPage;
