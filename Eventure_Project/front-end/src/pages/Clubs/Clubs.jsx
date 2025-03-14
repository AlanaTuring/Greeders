import React from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import backgroundImage from "../../assets/GreenOval.jpg"; // Background image

const clubs = [
  { name: "ACM", color: "#9c324f" },
  { name: "CSH", color: "#9c324f" },
  { name: "Archery", color: "#9c324f" },
  { name: "Classical Music Club", color: "#9c324f" },
  { name: "DDD Club", color: "#9c324f" },
  { name: "Chess Club", color: "#9c324f" },
  { name: "Robotics Club", color: "#9c324f" },
  { name: "IEEE", color: "#9c324f", link: "/clubs/ieee" }, // Add link for IEEE
  { name: "Secular Club", color: "#9c324f" },
  { name: "Insight Club", color: "#9c324f" },
  { name: "African Club", color: "#9c324f" },
  { name: "Lebanese Heritage Club", color: "#9c324f" },
];

const Clubs = () => {
  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div> {/* Transparent Overlay */}
      <h1 style={styles.header}>Clubs</h1>
      <div style={styles.grid}>
        {clubs.map((club, index) => (
          <Link
            key={index}
            to={club.link || "#"} // If there's a link, navigate, otherwise stay
            style={{ textDecoration: "none", position: "relative", zIndex: 2 }} // Ensuring link is above overlay
          >
            <div className="club-card" style={{ ...styles.card, backgroundColor: club.color }}>
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
    zIndex: 1, // Ensure overlay is behind content
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
    zIndex: 2, // Ensure the card is above the overlay
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
