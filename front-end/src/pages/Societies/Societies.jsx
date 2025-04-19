import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Societies = () => {
  const [societies, setSocieties] = useState([]);

  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/societies`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const societiesData = await response.json();
        setSocieties(societiesData);
      } catch (error) {
        console.error("Error fetching societies:", error);
      }
    };

    fetchSocieties();
  }, []);

  return (
    <div style={styles.container} className="position-relative">
      <div style={styles.overlay}></div>
      <h1 style={styles.header}>Societies</h1>

      {/* Bootstrap grid wrapper */}
      <div className="container">
        <div className="row" style={styles.grid}>
          {societies.map((club) => (
            <div key={club._id} className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <Link
                to={club.link ? club.link : `/societies/${club._id}`}
                style={{ textDecoration: "none", position: "relative", zIndex: 2 }}
              >
                <div style={styles.card}>
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
            </div>
          ))}
        </div>
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
    zIndex: 2,
  },
  card: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    transition: "transform 0.3s ease",
    zIndex: 2,
    borderRadius: "10px",
    overflow: "hidden",
    backgroundColor: "#f3f3fa",
    padding: "10px",
    border: "2px solid #e1e1e4",
  },
  logoBox: {
    width: "100px",
    height: "100px",
    marginRight: "20px",
  },
  logo: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
    borderRadius: "10px",
  },
  nameBox: {
    flex: 1,
    padding: "15px",
    borderRadius: "8px",
  },
  text: {
    color: "black",
    fontSize: "20px",
    fontWeight: "bold",
    fontFamily: "Arial, sans-serif",
    margin: 0,
  },
};

export default Societies;
