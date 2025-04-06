import React from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/background-video.mp4"; // Correct path to background video

const categories = [
  { name: "AUB", color: "#bc7c8c", link: "/" },
  { name: "Clubs", color: "#bc7c8c", link: "/clubs" },
  { name: "Societies", color: "#bc7c8c", link: "/societies" },
  { name: "Faculties", color: "#bc7c8c", link: "/faculties" },
];

const Home = () => {
  return (
    <div style={styles.container}>
      {/* Add the keyframes animation in a style tag */}
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(-100%); /* Start off the screen to the left */
            }
            to {
              transform: translateX(0); /* Move to the original position */
            }
          }
        `}
      </style>

      {/* Left Side (Categories) */}
      <div style={styles.leftSection}>
        <h1 style={{ ...styles.header, animation: "slideIn 0.6s ease-out" }}>Categories</h1> {/* Animation applied here */}
        <div style={styles.grid}>
          {categories.map((category, index) => (
            <Link
              key={index}
              to={category.link}
              style={{
                ...styles.card,
                backgroundColor: category.color,
                animation: "slideIn 0.6s ease-out", // Apply the animation
              }}
            >
              <h2 style={styles.text}>{category.name}</h2>
            </Link>
          ))}
        </div>
      </div>

      {/* Right Side (Description with Background Video) */}
      <div style={styles.rightSection}>
        <video autoPlay loop muted style={styles.videoBackground}>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div style={styles.overlay}>
          <p style={styles.description}>
            Welcome to <strong>Eventure</strong>, the ultimate hub for all your university events! 
            No more sifting through endless emails or searching for posters. 
            With Eventure, everything you need to know about campus events is right at your fingertips. 
            Stay updated, get involved, and make the most of your university experience—all in one place!
          </p>
        </div>
      </div>

      {/* Profile Button */}
      <Link to="/profile" style={styles.profileButton}>
        Profile
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",  // Full height of the viewport
  },
  leftSection: {
    width: "50%",
    backgroundColor: "#923152", // Ensure the background color is applied
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "110vh", // Ensure it takes the full height of the viewport
  },
  header: {
    color: "white",
    fontSize: "80px",
    fontFamily: "Impact, fantasy",
    marginBottom: "50px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    width: "90%",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "120px",
    borderRadius: "15px",
    textDecoration: "none",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },
  text: {
    color: "white",
    fontSize: "40px",
    fontFamily: "'Poppins', sans-serif",
  },
  rightSection: {
    width: "50%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    height: "103vh", // Ensure the right section takes full height
    overflow: "hidden", // Ensure the video is clipped to fit
  },
  videoBackground: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    objectFit: "cover", // Ensures the video covers the entire container
    zIndex: -1, // Makes sure the video is behind the content
  },
  overlay: {
    backgroundColor: "rgba(134, 0, 51, 0.3)",
    position: "absolute", // Make overlay position absolute within the right section
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1, // Overlay should be above the video
  },
  description: {
    fontSize: "24px",
    fontWeight: "bold",
    fontFamily: "'Poppins', sans-serif",
    color: "white",
    lineHeight: "1.8",
    width: "80%",
  },
  profileButton: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    padding: "10px 20px",
    backgroundColor: "#3f5c92",
    color: "white",
    borderRadius: "25px",
    fontSize: "18px",
    textDecoration: "none",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
};

export default Home;
