import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login, isLoggedIn } = useContext(UserContext);

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (isLoggedIn && savedRole === "student") navigate("/home");
    if (isLoggedIn && savedRole === "organizer") navigate("/organizer");
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (!response.ok) {
        toast.error(data.message || "Invalid credentials");
        return;
      }

      const token = data?.token;
      if (!token) throw new Error("Token not received");

      localStorage.setItem("userToken", token);
      localStorage.setItem("userEmail", email);

      let role = null;

      // ✅ First check: Organizer
      try {
        const organizerRes = await fetch(`http://localhost:5001/api/organizers/check-role/${email}`);
        const organizerData = await organizerRes.json();
        console.log("Organizer role response:", organizerData);
        if (organizerRes.ok && organizerData?.role === "organizer") {
          role = "organizer";
        }
      } catch (err) {
        console.error("Organizer role check failed:", err);
      }

      // ✅ Fallback check: Student
      if (!role) {
        try {
          const studentRes = await fetch(`http://localhost:5001/api/students/check-role/${email}`);
          const studentData = await studentRes.json();
          console.log("Student role response:", studentData);
          if (studentRes.ok && studentData?.role === "student") {
            role = "student";
          }
        } catch (err) {
          console.error("Student role check failed:", err);
        }
      }

      if (!role) {
        toast.error("Login succeeded, but user role could not be determined.");
        return;
      }

      localStorage.setItem("role", role);
      login(token, email, role);

      console.log("Final assigned role:", role);

      toast.success("Login successful!");

      if (role === "student") {
        navigate("/home");
      } else if (role === "organizer") {
        navigate("/organizer");
      }
    } catch (error) {
      console.error("Login Error:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  return (
    <div style={styles.background}>
      <ToastContainer />
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Login</h1>
        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Login</button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <a href="/signup" style={{ color: "#fff", textDecoration: "underline" }}>Sign up</a><br />
          <a href="/forgot-password" style={{ color: "#fff", textDecoration: "underline" }}>Forgot your password?</a>
        </p>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: 'url(/aubtower.png)',
    backgroundSize: '130%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
  },
  overlay: {
    width: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '40px',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '30px',
    color: '#fff',
    fontFamily: "Monaco, monospace",
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 6px 18px rgba(0, 0, 0, 0.3)',
    color: '#333',
    boxSizing: 'border-box',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    fontSize: '16px',
    marginBottom: '8px',
    color: '#333',
    display: 'block',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '14px',
    backgroundColor: '#850836',
    color: 'white',
    fontSize: '18px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '25px',
    fontSize: '14px',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '1.6',
  },
};

export default LoginPage;
