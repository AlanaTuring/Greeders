import React from "react";
import { Link } from "react-router-dom";
import backgroundVideo from "../assets/background-video.mp4";

const categories = [
  { 
    name: "Clubs", 
    color: "#FFFFFF", 
    link: "/clubs",
    logo: "clubslogo.png",  // Add logo filename here
    description: "Explore a variety of clubs, from academic groups to fun activities and more! Get involved and make new friends!" 
  },
  { 
    name: "Societies", 
    color: "#FFFFFF", 
    link: "/societies",
    logo: "societieslogo.png",  // Add logo filename here
    description: "Join a society and expand your knowledge. Attend events and discover new passions with like-minded individuals!" 
  },
  { 
    name: "Faculties", 
    color: "#FFFFFF", 
    link: "/faculties",
    logo: "facultieslogo.png",  // Add logo filename here
    description: "Learn about the various faculties at your university. Find out how to get involved and meet fellow students in your field!" 
  },
];

const Home = () => {
  return (
    <div style={styles.page}>
      {/* Top Section with Video Background */}
      <div style={styles.topSection}>
        <video autoPlay loop muted style={styles.videoBackground}>
          <source src={backgroundVideo} type="video/mp4" />
        </video>
        <div style={styles.overlay}>
          <h1 style={styles.title}>Eventure</h1>
          <p style={styles.description}>
            The ultimate hub for all your university events! No more sifting
            through endless emails or posters. Stay updated, get involved, and
            make the most of your experience—all in one place!
          </p>
        </div>
      </div>

      {/* Floating Categories Section */}
      <div style={styles.floatingCategories}>
        {categories.map((category, index) => {
          let verticalOffset = 0;
          if (index === 0) verticalOffset = 40; // Clubs - lower
          if (index === 1) verticalOffset = -40; // Societies - higher
          if (index === 2) verticalOffset = 40; // Faculties - lower
          return (
            <Link
              key={index}
              to={category.link}
              style={{
                ...styles.card,
                backgroundColor: category.color,
                transform: `translateY(${verticalOffset}px)`,
              }}
            >
              {/* Display logo above the category name */}
              <img
                src={`./pics/${category.logo}`}  // Reference logo from the public folder
                alt={`${category.name} logo`}
                style={styles.logo}
              />
              <h2 style={styles.cardText}>{category.name}</h2>
              <p style={styles.cardDescription}>{category.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Gray Section Below Video */}
      <div style={styles.graySection}>
        {/* Add any additional content you'd like in the gray section here */}
      </div>
    </div>
  );
};

const styles = {
  page: {
    display: "flex",
    flexDirection: "column",
    minHeight: "120vh", // <--- Add this line to allow scrolling
  },
  
  topSection: {
    position: "relative",
    height: "100vh", // full screen
    width: "100%",
    overflow: "hidden",
    marginBottom: 0,  // <-- Adjusted to remove extra space
    padding: 0, 
  },
  videoBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    objectFit: "cover",
    zIndex: -1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgb(105,105,105, 0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "0 20px",
  },
  title: {
    fontSize: "70px",
    color: "white",
    fontWeight: "bold",
    fontFamily: "verdana, fantasy",
    marginBottom: "20px",
  },
  description: {
    fontSize: "25px",
    color: "white",
    fontFamily: "'Poppins', sans-serif",
    maxWidth: "800px",
    lineHeight: "1.8",
  },
  floatingCategories: {
    display: "flex",
    justifyContent: "center",
    gap: "70px",
    marginTop: "-70px", // <-- Adjusted this to bring the categories closer
    zIndex: 2,
    position: "relative",
  },
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column", // Added this to stack text vertically
    height: "250px",
    width: "390px",
    borderRadius: "12px",  // <-- Reduced border-radius to make edges less curvy
    textDecoration: "none",
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease",
    padding: "20px", // Added some padding for better spacing inside the card
  },
  cardText: {
    color: "#334155",
    fontSize: "30px",
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "bold",
    marginBottom: "-10px",
  },
  cardDescription: {
    color: "#a7b1bd",
    fontSize: "25px", 
    fontFamily: "'Poppins', sans-serif",
    fontWeight: "normal",
    textAlign: "center", 
  },
  logo: {
    width: "50px",  // Set a small size for the logos
    height: "auto",
  },
  graySection: {
    backgroundColor: "#e2e8f0", // Gray background
    height: "50vh", // Adjust this to control the height
    width: "98%",
    padding: "20px",
    marginTop: "-220px", // <-- Added this to reduce the space between sections
  },
};

export default Home;
