import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (event) => {
    event.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const role = urlParams.get("role");
    const userId = window.location.pathname.split("/").pop();

    try {
      const response = await fetch(`/api/auth/reset-password/${userId}?role=${role}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const result = await response.json();
      alert(result.msg);
      if (result.msg === "Password reset successful") {
        navigate("/login"); // Redirect to login page after successful reset
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <div className="logo">
        <img src="/aub-logo.png" alt="Logo name" />
      </div>
      <h1>Reset Password</h1>
      <p>Enter your new password below.</p>
      <form onSubmit={handleResetPassword}>
        <input
          type="password"
          name="password"
          placeholder="New Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="btn">
          Reset Password
        </button>
      </form>
      <div className="additional-options">
        <p>
          Back to <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
