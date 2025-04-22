import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.msg);
        navigate('/login');
      } else {
        toast.error(result.msg || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An error occurred. Please try again.');
    }
  };

  return (
    <div style={styles.background}>
      <ToastContainer />
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Sign Up</h1>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="name" style={styles.label}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputContainer}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              style={styles.input}
              required
            />
          </div>

          <input type="hidden" name="role" value="student" />

          <button type="submit" style={styles.button}>Sign Up</button>

          <p style={styles.footer}>
            Already have an account? <a href="/login" style={styles.link}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

const styles = {
  background: {
    backgroundImage: 'url(/aubtower.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100vw',
    display: 'flex',
  },
  overlay: {
    position: 'absolute',
    width: '50%',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    boxSizing: 'border-box',
    padding: '20px',
  },
  heading: {
    fontSize: '28px',
    marginBottom: '20px',
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
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    color: '#333',
    boxSizing: 'border-box',
  },
  inputContainer: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#333',
    display: 'block',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '12px',
    backgroundColor: '#850836',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '15px',
    fontSize: '12px',
    color: '#333',
    textAlign: 'center',
    lineHeight: '1.6',
  },
  link: {
    color: '#850836',
    textDecoration: 'underline',
  },
};

export default SignupPage;
