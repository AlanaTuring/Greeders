// // import React from "react";
// // import SocietiesList from "../../components/SocietiesList";

// // const SocietiesTemp = () => {
// //   return (
// //       <SocietiesList />
// //   );
// // };

// // export default SocietiesTemp;


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from "../../assets/GreenOval.jpg";

// const Societies = () => {
//   const [societies, setSocieties] = useState([]);

//   useEffect(() => {
//     const fetchSocieties = async () => {
//       try {
//         // Adjust the URL if your backend is hosted elsewhere
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/societies`); // Replace with your backend route
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const societiesData = await response.json();
//         setSocieties(societiesData); // Store fetched societies in state
//       } catch (error) {
//         console.error("Error fetching societies:", error);
//       }
//     };

//     fetchSocieties(); // Fetch societies when the component mounts
//   }, []);

//   return (
//     <div style={styles.container}>
//       <div style={styles.overlay}></div>
//       <h1 style={styles.header}>Societies</h1>
//       <div style={styles.grid}>
//         {societies.map((society, index) => (
//           <Link
//             key={society._id || index} // Use the society's _id from MongoDB, fallback to index if needed
//             to={`/societies/${society._id}`} // Link to a society detail page, replace with your actual path
//             style={{ textDecoration: "none", position: "relative", zIndex: 2 }}
//           >
//             <div
//               className="society-card"
//               style={{ ...styles.card, backgroundColor: "#9c324f" }}
//             >
//               <h2 style={styles.text}>{society.name}</h2>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     textAlign: "center",
//     padding: "20px",
//     width: "100%",
//     backgroundColor: "rgba(167, 97, 117, 0.8)", // Background with transparency
//     backgroundImage: `url(${backgroundImage})`, // Use the imported image
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     position: "relative", // Make the container position relative to stack the overlay on top
//   },
//   overlay: {
//     position: "absolute", // Position overlay on top of the image
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(167, 97, 117, 0.5)", // Transparent overlay with rgba
//     zIndex: 1, // Ensure the overlay stays on top of the background image
//   },
//   header: {
//     fontSize: "100px", // Larger text for the header
//     marginBottom: "70px",
//     fontFamily: "Impact, fantasy",
//     color: "white",
//     zIndex: 2, // Ensure the header is above the overlay
//     position: "relative",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", // Adjusted to auto-fill with a minimum size for each card
//     gap: "15px", // Smaller gap between the cards
//     maxWidth: "100%",
//     padding: "10px",
//     margin: "0 auto",
//     zIndex: 2, // Ensure grid is above the overlay
//   },
//   card: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "180px", // Adjusted height for the cards
//     borderRadius: "15px",
//     textDecoration: "none",
//     boxSizing: "border-box",
//     transition: "transform 0.3s ease", // Transition for the hover effect
//     zIndex: 2, // Ensure the cards are above the overlay
//   },
//   text: {
//     color: "white",
//     fontSize: "30px", // Adjusted font size for better readability
//     textAlign: "center",
//     fontWeight: "bold",
//     fontFamily: "New Century Schoolbook, TeX Gyre Schola, serif",
//   },
// };

// export default Societies;
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const societies = () => {
  const [societies, setsocieties] = useState([]);

  useEffect(() => {
    const fetchsocieties = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/societies`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const societiesData = await response.json();
        setsocieties(societiesData);
      } catch (error) {
        console.error("Error fetching societies:", error);
      }
    };

    fetchsocieties();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <h1 style={styles.header}>Societies</h1>
      <div style={styles.grid}>
        {societies.map((club, index) => (
          <Link
            key={club._id}
            to={club.link ? club.link : `/societies/${club._id}`}
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

export default societies;
