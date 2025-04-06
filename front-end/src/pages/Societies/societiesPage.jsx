import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import calendarOverlay from "../../assets/calendar_overlay.png";


const SocietiesPage = () => {
  const { id } = useParams();
  const [society, setSociety] = useState(null);
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [bgColor, setBgColor] = useState("rgb(255, 255, 255)"); // Default background color

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/societies/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setSociety(data);
        if (data.events) {
          setEvents(
            data.events.map((event) => ({
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
    img.crossOrigin = "Anonymous"; // Ensure CORS compliance
    img.src = imageSrc;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      // Sample the center pixel for a dominant color
      const sampleX = Math.floor(img.width / 2);
      const sampleY = Math.floor(img.height / 2);
      const pixelData = ctx.getImageData(sampleX, sampleY, 1, 1).data;

      const rgbColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`;
      setBgColor(rgbColor);
    };
  };

  if (!society) return <div>Loading...</div>;

  return (
    <div
      style={{
        ...styles.container,
        backgroundImage: `linear-gradient(rgba(${bgColor
          .replace("rgb(", "")
          .replace(")", "")}, 0.7), rgba(${bgColor
          .replace("rgb(", "")
          .replace(")", "")}, 0.7)), url(${calendarOverlay})`,
      }}
    >
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
          eventClick={(info) =>
            setModalOpen(true) || setSelectedEvent(info.event)
          }
          height="auto"
          aspectRatio={2}
          eventContent={(eventInfo) => (
            <div>
              <span>{eventInfo.event.title}</span>
            </div>
          )}
        />
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          style={styles.modalOverlay}
          onClick={() => setModalOpen(false)}
        >
          <div
            style={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedEvent?.title}</h2>
            <p>{selectedEvent?.extendedProps?.description}</p>
            <button
              onClick={() => setModalOpen(false)}
              style={styles.closeButton}
            >
              Close
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
    backgroundSize: "cover", // Keeps the image stretched across the container
    backgroundPosition: "center center", // Center the image
    backgroundRepeat: "no-repeat", // Prevent background repetition
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
    backgroundColor: "#bc7c8c",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "20px",
  },
};

export default SocietiesPage;
