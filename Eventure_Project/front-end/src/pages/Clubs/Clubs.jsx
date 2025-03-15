import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../../assets/GreenOval.jpg";

const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        // Adjust the URL if your backend is hosted elsewhere
        const response = await fetch("http://localhost:5001/api/clubs");
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
            key={club._id} // Use the club's _id from MongoDB, fallback to index if needed
            // If you want to navigate to a club detail page, you can use the club's _id in the URL
            to={club.link ? club.link : `/clubs/${club._id}`}
            style={{ textDecoration: "none", position: "relative", zIndex: 2 }}
          >
            <div
              className="club-card"
              style={{ ...styles.card, backgroundColor: "#9c324f" }}
            >
              <h2 style={styles.text}>{club.name}</h2>
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
    backgroundColor: "rgba(132, 4, 50, 0.8)",
    backgroundImage: `url(${backgroundImage})`,
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
    backgroundColor: "rgba(167, 97, 117, 0.5)",
    zIndex: 1,
  },
  header: {
    fontSize: "100px",
    marginBottom: "70px",
    fontFamily: "Impact, fantasy",
    color: "white",
    zIndex: 2,
    position: "relative",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "15px",
    maxWidth: "100%",
    padding: "10px",
    margin: "0 auto",
    zIndex: 2,
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "180px",
    borderRadius: "15px",
    textDecoration: "none",
    boxSizing: "border-box",
    transition: "transform 0.3s ease",
    zIndex: 2,
  },
  text: {
    color: "white",
    fontSize: "30px",
    textAlign: "center",
    fontWeight: "bold",
    fontFamily: "New Century Schoolbook, TeX Gyre Schola, serif",
  },
};

export default Clubs;
