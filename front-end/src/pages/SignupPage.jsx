import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // adjust path if needed

const SignupPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'student' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5001/api/auth/register', {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);  // Log the result to see if we have any specific error message

      if (response.ok) {
        alert(result.msg);
        navigate('/login');  // Navigate to the login page on successful registration
      } else {
        alert(result.msg || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Signup error:', error);  // Log error in the console
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/aub-logo.png" alt="Logo name" />
      </div>
      <h1>Sign Up to Eventure</h1>
      <p>Join us and start your journey!</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label htmlFor="role">Register as:</label>
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="student">Student</option>
          <option value="organizer">Organizer</option>
        </select>
        <button type="submit" className="btn">Sign Up</button>
      </form>
      <div className="additional-options">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default SignupPage;
