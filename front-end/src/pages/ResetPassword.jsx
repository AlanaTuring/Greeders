import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css"; // Ensure this path matches your file structure

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get("role");
    const userId = window.location.pathname.split("/").pop();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password/${userId}?role=${role}`,  
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        toast.success(result.msg);
        if (result.msg === "Password reset successful") {
          setTimeout(() => navigate("/login"), 2000);
        }
      } else {
        toast.error(result.msg || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div style={styles.background}>
      <ToastContainer />
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Reset Password</h1>
        <p style={styles.subheading}>Enter your new password below.</p>
        <form onSubmit={handleResetPassword} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>New Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>Reset Password</button>
        </form>

        <p style={styles.footer}>
          Back to <a href="/login" style={styles.link}>Login</a>
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
  subheading: {
    fontSize: '18px',
    marginBottom: '20px',
    color: '#fff',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '400px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '30px',
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
  link: {
    color: '#fff',
    textDecoration: 'underline',
  },
};

export default ResetPassword;
