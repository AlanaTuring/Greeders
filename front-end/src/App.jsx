// import React, { useState, useEffect, useContext } from "react";
// import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
// import { UserContext } from "./context/userContext";

// // Page imports
// import Home from "./pages/Home";
// import LoginPage from "./pages/LoginPage";
// import SignupPage from "./pages/SignupPage";
// import ForgotPassword from "./pages/ForgotPassword";
// import ResetPassword from "./pages/ResetPassword";
// import Societies from "./pages/Societies/Societies";
// import SocietiesPage from "./pages/Societies/societiesPage";
// import Faculties from "./pages/Faculties/Faculties";
// import FacultiesPage from "./pages/Faculties/FacultiesPage";
// import Clubs from "./pages/Clubs/Clubs";
// import ClubPage from "./pages/Clubs/ClubPage";  // Make sure ClubPage is imported
// import Profile from "./pages/Profile";
// import OrganizerDashboard from "./pages/OrganizerDashboard";
// import AddEventForm from "./pages/AddEventForm";
// import EditEvent from "./pages/EditEvent";
// import RoleSelection from "./pages/RoleSelection";

// const App = () => {
//   const { isLoggedIn, logout } = useContext(UserContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [clubData, setClubData] = useState(null);
//   const [events, setEvents] = useState([]);

//   // Use the email from localStorage to fetch the organizer data
//   const userEmail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     const savedRole = localStorage.getItem("role");
//     if (savedRole) {
//       setRole(savedRole);
//     }
//     setLoading(false);
//   }, []);

//   // Function to fetch organizer data using the stored email
//   const fetchOrganizerData = async (email) => {
//     try {
//       setLoading(true);

//       const response = await fetch(`http://localhost:5001/api/organizer/${email}`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setClubData(data.club);
//         setEvents(data.events);
//       } else {
//         console.error("Error fetching organizer data", data);
//       }

//       setLoading(false);
//     } catch (error) {
//       console.error("Error:", error);
//       setLoading(false);
//     }
//   };

//   // Handle role selection for organizer
//   const handleSelectRole = (selectedRole) => {
//     setRole(selectedRole);
//     localStorage.setItem("role", selectedRole);
//     if (selectedRole === "organizer" && userEmail) {
//       fetchOrganizerData(userEmail); // Fetch organizer data after role selection
//       navigate("/organizerDashboard");
//     } else {
//       navigate("/home");
//     }
//   };

//   const handleLogout = () => {
//     logout();
//     localStorage.removeItem("role");
//     localStorage.removeItem("userEmail");
//     setRole(null);
//     setClubData(null);
//     setLoading(false);
//     navigate("/login");
//   };

//   // Define the function to add a new event
//   const handleAddEvent = (newEvent) => {
//     setEvents((prevEvents) => [...prevEvents, newEvent]);
//   };

//   const showNavbar = isLoggedIn && location.pathname !== "/role-selection";

//   return (
//     <div>
//       {showNavbar && (
//         <nav style={styles.navbar}>
//           {role === "student" && (
//             <>
//               <Link to="/home" style={styles.navLink}>Home</Link>
//               <Link to="/profile" style={styles.navLink}>Profile</Link>
//               <Link to="/clubs" style={styles.navLink}>Clubs</Link>
//               <Link to="/societies" style={styles.navLink}>Societies</Link>
//               <Link to="/faculties" style={styles.navLink}>Faculties</Link>
//               <button onClick={handleLogout} style={styles.navLink}>Logout</button>
//             </>
//           )}
//           {role === "organizer" && (
//             <>
//               <Link to="/organizerDashboard" style={styles.navLink}>Organizer Dashboard</Link>
//               <button onClick={handleLogout} style={styles.navLink}>Logout</button>
//             </>
//           )}
//         </nav>
//       )}

//       <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/signup" element={<SignupPage />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/reset-password/:userId" element={<ResetPassword />} />
//         <Route path="/role-selection" element={isLoggedIn ? <RoleSelection onSelectRole={handleSelectRole} /> : <Navigate to="/login" />} />
//         <Route path="/home" element={isLoggedIn && role === "student" ? <Home /> : <Navigate to="/role-selection" />} />
//         <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
//         <Route path="/organizer" element={isLoggedIn && role === "organizer" ? (
//           loading ? <div>Loading...</div> : <OrganizerDashboard clubData={clubData} events={events} />
//         ) : (
//           <Navigate to="/role-selection" />
//         )} />
//         <Route path="/add-event" element={isLoggedIn ? <AddEventForm onAddEvent={handleAddEvent} /> : <Navigate to="/login" />} />
//         <Route path="/edit-event/:eventId" element={isLoggedIn ? <EditEvent /> : <Navigate to="/login" />} />

//         {/* Add dynamic route for Club page */}
//         <Route path="/clubs/:clubId" element={<ClubPage />} />
//         <Route path="/faculties/:id" element={<FacultiesPage />} />
//         <Route path="/societies/:id" element={<SocietiesPage />} />
        
//         {/* Other Routes */}
//         <Route path="/clubs" element={<Clubs />} />
//         <Route path="/societies" element={<Societies />} />
//         <Route path="/faculties" element={<Faculties />} />
//       </Routes>
//     </div>
//   );
// };

// const styles = {
//   navbar: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#923152",
//     padding: "15px 0",
//     flexWrap: "wrap",
//   },
//   navLink: {
//     textDecoration: "none",
//     color: "white",
//     fontSize: "18px",
//     fontWeight: "bold",
//     padding: "10px 20px",
//     margin: "5px 10px",
//     borderRadius: "5px",
//     transition: "all 0.3s ease-in-out",
//     backgroundColor: "#923152",
//     border: "none",
//     cursor: "pointer",
//   },
// };

// export default App;


import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Link, Navigate, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "./context/userContext";

// Page imports
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Societies from "./pages/Societies/Societies";
import SocietiesPage from "./pages/Societies/societiesPage";
import Faculties from "./pages/Faculties/Faculties";
import FacultiesPage from "./pages/Faculties/FacultiesPage";
import Clubs from "./pages/Clubs/Clubs";
import ClubPage from "./pages/Clubs/ClubPage";  // Make sure ClubPage is imported
import Profile from "./pages/Profile";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import AddEventForm from "./pages/AddEventForm";
import EditEvent from "./pages/EditEvent";
import RoleSelection from "./pages/RoleSelection";

const App = () => {
  const { isLoggedIn, logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [clubData, setClubData] = useState(null);
  const [events, setEvents] = useState([]);

  // Use the email from localStorage to fetch the organizer data
  const userEmail = localStorage.getItem("userEmail");

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      setRole(savedRole);
    }
    setLoading(false);
  }, []);

  // Function to fetch organizer data using the stored email
  const fetchOrganizerData = async (email) => {
    try {
      setLoading(true);

      const response = await fetch(`http://localhost:5001/api/organizer/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        setClubData(data.club);
        setEvents(data.events);
      } else {
        console.error("Error fetching organizer data", data);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  // Handle role selection for organizer
  const handleSelectRole = (selectedRole) => {
    setRole(selectedRole);
    localStorage.setItem("role", selectedRole);
    if (selectedRole === "organizer" && userEmail) {
      fetchOrganizerData(userEmail); // Fetch organizer data after role selection
      navigate("/organizer");
    } else {
      navigate("/home");
    }
  };

  const handleLogout = () => {
    logout();
    localStorage.removeItem("role");
    localStorage.removeItem("userEmail");
    setRole(null);
    setClubData(null);
    setLoading(false);
    navigate("/login");
  };

  // Define the function to add a new event
  const handleAddEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const showNavbar = isLoggedIn && location.pathname !== "/role-selection";

  return (
    <div>
      {showNavbar && (
        <nav style={styles.navbar}>
          {role === "student" && (
            <>
              <Link to="/home" style={styles.navLink}>Home</Link>
              <Link to="/clubs" style={styles.navLink}>Clubs</Link>
              <Link to="/societies" style={styles.navLink}>Societies</Link>
              <Link to="/faculties" style={styles.navLink}>Faculties</Link>
              <Link to="/profile" style={styles.navLink}>Profile</Link>
              <button onClick={handleLogout} style={styles.navLink}>Logout</button>
            </>
          )}
          {role === "organizer" && (
            <>
              <Link to="/organizer" style={styles.navLink}>Organizer Dashboard</Link>
              <button onClick={handleLogout} style={styles.navLink}>Logout</button>
            </>
          )}
        </nav>
      )}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:userId" element={<ResetPassword />} />
        <Route path="/role-selection" element={isLoggedIn ? <RoleSelection onSelectRole={handleSelectRole} /> : <Navigate to="/login" />} />
        <Route path="/home" element={isLoggedIn && role === "student" ? <Home /> : <Navigate to="/role-selection" />} />
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/organizer" element={isLoggedIn && role === "organizer" ? (
          loading ? <div>Loading...</div> : <OrganizerDashboard clubData={clubData} events={events} />
        ) : (
          <Navigate to="/role-selection" />
        )} />
        <Route path="/add-event" element={isLoggedIn ? <AddEventForm onAddEvent={handleAddEvent} /> : <Navigate to="/login" />} />
        <Route path="/edit-event/:eventId" element={isLoggedIn ? <EditEvent /> : <Navigate to="/login" />} />

        {/* Add dynamic route for Club page */}
    
        <Route path="/clubs/:clubId" element={<ClubPage />} />
//         <Route path="/faculties/:id" element={<FacultiesPage />} />
//         <Route path="/societies/:id" element={<SocietiesPage />} />

        {/* Other Routes */}
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/societies" element={<Societies />} />
        <Route path="/faculties" element={<Faculties />} />
      </Routes>
    </div>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#923152",
    padding: "15px 0",
    flexWrap: "wrap",
  },
  navLink: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
    fontWeight: "bold",
    padding: "10px 20px",
    margin: "5px 10px",
    borderRadius: "5px",
    transition: "all 0.3s ease-in-out",
    backgroundColor: "#923152",
    border: "none",
    cursor: "pointer",
  },
};

export default App;