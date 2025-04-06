// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import backgroundImage from "../../assets/GreenOval.jpg"; // Correct image import


// const Faculties = () => {
//   const [faculties, setFaculties] = useState([]);

//   useEffect(() => {
//     const fetchFaculties = async () => {
//       try {
//         const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/faculties`);
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const facultiesData = await response.json();
//         setFaculties(facultiesData);
//       } catch (error) {
//         console.error("Error fetching faculties:", error);
//       }
//     };

//     fetchFaculties();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <div style={styles.overlay}></div>
//       <h1 style={styles.header}>Faculties</h1>
//       <div style={styles.grid}>
//         {faculties.map((faculty) => (
//           <Link
//             key={faculty._id}
//             to={`/faculties/${faculty._id}`}
//             style={{ textDecoration: "none", position: "relative", zIndex: 2 }}
//           >
//             <div
//               className="faculty-card"
//               style={{ ...styles.card, backgroundColor: faculty.color || "#9c324f" }}
//             >
//               <h2 style={styles.text}>{faculty.name}</h2>
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
//     backgroundColor: "rgba(132, 4, 50, 0.5)",
//     backgroundImage: `url(${backgroundImage})`,
//     backgroundSize: "cover",
//     backgroundPosition: "center",
//     backgroundRepeat: "no-repeat",
//     position: "relative",
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: "rgba(167, 97, 117, 0.5)",
//     zIndex: 1,
//   },
//   header: {
//     fontSize: "100px",
//     marginBottom: "70px",
//     fontFamily: "Impact, fantasy",
//     color: "white",
//     zIndex: 2,
//     position: "relative",
//   },
//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
//     gap: "15px",
//     maxWidth: "100%",
//     padding: "10px",
//     margin: "0 auto",
//     zIndex: 2,
//   },
//   card: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     height: "180px",
//     borderRadius: "15px",
//     textDecoration: "none",
//     boxSizing: "border-box",
//     transition: "transform 0.3s ease",
//     zIndex: 2,
//   },
//   text: {
//     color: "white",
//     fontSize: "30px",
//     textAlign: "center",
//     fontWeight: "bold",
//     fontFamily: "New Century Schoolbook, TeX Gyre Schola, serif",
//   },
// };

// export default Faculties;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const faculties = () => {
  const [faculties, setfaculties] = useState([]);

  useEffect(() => {
    const fetchfaculties = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/faculties`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const facultiesData = await response.json();
        setfaculties(facultiesData);
      } catch (error) {
        console.error("Error fetching faculties:", error);
      }
    };

    fetchfaculties();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>
      <h1 style={styles.header}>faculties</h1>
      <div style={styles.grid}>
        {faculties.map((club, index) => (
          <Link
            key={club._id}
            to={club.link ? club.link : `/faculties/${club._id}`}
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

export default faculties;
