import React, { useState } from "react";
import "../Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import logo from "../images/logo.png"; 

const Login = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Attempting login with:", { username, password: "***" }); // Debug log

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response status:", res.status); // Debug log
      const data = await res.text();
      console.log("Response data:", data); // Debug log
      
      setMessage(data);
      if (data === "Login successful" && onLoginSuccess) {
        onLoginSuccess();
        navigate("/main"); 
      }
    } catch (err) {
      console.error("Login error:", err);
      setMessage("Server error. Please try again later.");
    }
  };

   return (

    <div className="page-layout">
    <div className="login-page">

      <MapContainer
        center={[51.05, -114.25]}
        zoom={10}
        style={{ height: "100vh", width: "100vw" }}
        className="background-map">

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>

    
    <div className="login-card">
    <form className="login-info" onSubmit={handleLogin}>

        <div className="curved-title">
           <svg className="curved-svg" viewBox="0 0 500 200">
            <path id="curve" d="M 50 250 Q 250 20 450 250" />
              <text className="curved-text">
                <textPath href="#curve" startOffset="50%">
                  Welcome to Bit by Bit
                </textPath>
              </text>
            </svg>
         </div>

        <img src={logo} alt="Logo" className="login-logo" />

        <h2 className="login-title">Login</h2>
        
        <label className="field-label">Username</label>
        <input
          className="login-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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

        <Link to="/signup" className="signup-link">
          Don't have an account? Register here!
        </Link>

        <p className="disclaimer-text">
          By continuing, you acknowledge that you understand and agree to the
          <a href="#terms" className="legal-link"> Terms & Conditions </a>
          and <a href="#policy" className="legal-link"> Privacy Policy</a>
        </p>

        {message && <p>{message}</p>}
      </form>
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