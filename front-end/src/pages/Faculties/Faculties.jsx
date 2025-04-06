import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../../assets/GreenOval.jpg'; // Correct image import

const Faculties = () => {
  const [faculties, setFaculties] = useState([]);

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/faculties"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const facultiesData = await response.json();
        setFaculties(facultiesData); // Set the fetched data in the state
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchFaculties(); // Call the function to fetch the faculties when the component mounts
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Overlay with transparent background */}
      <h1 style={styles.header}>Faculties</h1>
      <div style={styles.grid}>
        {faculties.map((faculty) => (
          <Link
            key={faculty._id} // Use the faculty's _id from MongoDB for unique key
            to={`/faculties/${faculty._id}`} // Navigate to a detailed page with the faculty's _id
            style={{ textDecoration: "none", position: "relative", zIndex: 2 }}
          >
            <div
              className="faculty-card"
              style={{ ...styles.card, backgroundColor: faculty.color || "#9c324f" }} // Use the color from the database, or fallback to a default
            >
              <h2 style={styles.text}>{faculty.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    width: "100%",
    backgroundColor: "rgba(132, 4, 50, 0.5)", // Background with transparency
    backgroundImage: `url(${backgroundImage})`, // Use the imported image
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative", // Make the container position relative to stack the overlay on top
  },
  overlay: {
    position: "absolute", // Position overlay on top of the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(167, 97, 117, 0.5)", // Transparent overlay with rgba
    zIndex: 1, // Ensure the overlay stays on top of the background image
  },
  header: {
    fontSize: "100px", // Larger text for the header
    marginBottom: "70px",
    fontFamily: "Impact, fantasy",
    color: "white",
    zIndex: 2, // Ensure the header is above the overlay
    position: "relative",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", // Adjust card size
    gap: "15px", // Smaller gap between the cards
    maxWidth: "100%",
    padding: "10px",
    margin: "0 auto",
    zIndex: 2, // Ensure grid is above the overlay
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "180px", // Adjusted height for the cards
    borderRadius: "15px",
    textDecoration: "none",
    boxSizing: "border-box",
    transition: "transform 0.3s ease", // Transition for the hover effect
    zIndex: 2, // Ensure the cards are above the overlay
  },
  text: {
    color: "white",
    fontSize: "30px", // Adjusted font size
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "New Century Schoolbook, TeX Gyre Schola, serif",
  },
};

export default Faculties;
