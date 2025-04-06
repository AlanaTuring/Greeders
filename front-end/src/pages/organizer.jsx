import React from "react";

const Organizer = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Organizer Dashboard</h1>
      <p style={styles.text}>Welcome, Organizer! Here you can manage events, clubs, and more.</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  header: {
    fontSize: "32px",
    color: "#923152",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    color: "#666",
  },
};

export default Organizer;