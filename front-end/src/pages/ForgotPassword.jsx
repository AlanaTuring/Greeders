import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles.css"; // Ensure this path matches your file structure

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.msg || "Reset link sent!");
        setTimeout(() => navigate('/'), 2000); // Delayed redirect
      } else {
        toast.error(result.msg || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending reset link:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={styles.background}>
      <ToastContainer />
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Forgot Password</h1>
        <form onSubmit={handleForgotPassword} style={styles.form}>
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

          <button type="submit" style={styles.button}>Send Reset Link</button>
        </form>

        <p style={styles.footer}>
          <a href="/login">Back to Login</a>
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

export default ForgotPassword;
