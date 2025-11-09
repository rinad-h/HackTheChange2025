import React, { useState } from "react";
import "../Login.css";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.text();
      setMessage(data);
      if (data === "Login successful" && onLoginSuccess) {
        onLoginSuccess();
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="page-layout">
      <path id="textPath" d="M10 50 C10 0 90 0 90 50"/>
    <div className="left-panel">
      <form className="login-card" onSubmit={handleLogin}>
        <h1 className="welcome-title"> Welcome to Bit by Bit</h1>
        <h2 className="login-title">Login</h2>
        
        <label className="field-label">Email</label>
        <input
          className="login-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
       
        <label className="field-label">Password</label>
        <input
          className="login-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login-button" type="submit">SIGN IN</button>

        <a
          href="/signup"
          className="signup-link"
        >Don't have an account? Register here!
        </a>

        {message && <p>{message}</p>}
      </form>

      <div className="right-panel">
      </div>
    </div>
    </div>
  );
};

/* const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f0f2f5",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "2rem",
    background: "#fff",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
  },
  input: {
    margin: "0.5rem 0",
    padding: "0.5rem",
    fontSize: "1rem",
  },
  button: {
    padding: "0.5rem",
    marginTop: "1rem",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
}; */

export default Login;
