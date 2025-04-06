import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/clubs`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const clubsData = await response.json();
        setClubs(clubsData);
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <h1 style={styles.header}>Clubs</h1>
      <div style={styles.grid}>
        {clubs.map((club, index) => (
          <Link
            key={club._id}
            to={club.link ? club.link : `/clubs/${club._id}`}
            style={{ textDecoration: "none", position: "relative", zIndex: 2 }}
          >
            <div
              style={{
                ...styles.card,
        
              }}
            >
              <div style={styles.logoBox}>
                <img
                  src={`/pics/${club.logo}`}
                  alt={club.name}
                  style={styles.logo}
                />
              </div>
              <div style={styles.nameBox}>
                <h2 style={styles.text}>{club.name}</h2>
              </div>
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
    backgroundColor: "#FFFFFF",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#ffffff",
    zIndex: 1,
  },
  header: {
    fontSize: "150px",
    marginBottom: "70px",
    fontFamily: "copperplate, fantasy",
    color: "#4a4a4a",
    zIndex: 2,
    position: "relative",

  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)", // Adjusted for 4 items per row
    gap: "20px", // Increased gap for better spacing
    padding: "20px",
    zIndex: 2,
  },
  card: {
    display: "flex",
    alignItems: "center", // Align logo and name horizontally
    textDecoration: "none",
    transition: "transform 0.3s ease",
    zIndex: 2,
    borderRadius: "10px",
    overflow: "hidden",
    // boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", Soft shadow for effect
    backgroundColor: "#f3f3fa", // White background for the whole card
    padding: "10px", // Padding inside the card
    border: "2px solid #e1e1e4",
  },
  logoBox: {
    width: "100px", // Adjust width for a more rectangular layout
    height: "100px", // Adjust height for a more rectangular logo box
    marginRight: "20px", // Space between logo and name
   
  },
  logo: {
    width: "100%", // Logo fills the container
    height: "100%",
    objectFit: "contain", // Keep aspect ratio
    display: "block",
    borderRadius: "10px",
  },
  nameBox: {
    flex: 1, // Allow name box to take up the remaining space
    padding: "15px", // Padding for the name box
    borderRadius: "8px", // Rounded corners for name box
  },
  text: {
    color: "black",
    fontSize: "20px", // Font size for name
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    margin: 0,
  },
};

export default Clubs;
