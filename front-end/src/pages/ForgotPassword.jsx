import React, { useState } from "react";
import "./styles.css"; // Make sure this path matches your file structure

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();
      alert(result.msg || "Reset link sent!");
    } catch (error) {
      console.error("Error sending reset link:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/aub-logo.png" alt="Logo name" />
      </div>
      <h1>Forgot Password</h1>
      <p>Enter your email to reset your password.</p>
      <form onSubmit={handleForgotPassword}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit" className="btn">Send Reset Link</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
