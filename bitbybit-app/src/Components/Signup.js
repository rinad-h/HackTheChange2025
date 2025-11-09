import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Signup.css";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import logo from "../images/logo.png"; 
import { Link } from "react-router-dom";


const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.text();
      setMessage(data);

      if (data === "User registered successfully") {
        navigate("/login"); 
      }
    } catch (err) {
      console.error(err);
      setMessage("Server error. Please try again later.");
    }
  };

  return (
    <div className="page-layout">
    <div className="signup-page">
      
      <MapContainer
        center={[51.05, -114.25]}
        zoom={10}
        style={{ height: "100vh", width: "100vw" }}
        className="background-map">
        
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>

      <div className="signup-card">
      <form className="signup-info" onSubmit={handleSignup}>

        <img src={logo} alt="Logo" className="login-logo" />
        <h2 className="signup-title">Signup!</h2>

        <label className="field-label">Username</label>
        <input
          className="signup-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required

        />

        <label className="field-label">Email</label>
        <input
          className="signup-input"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="field-label">Password</label>
        <input
          className="signup-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="signup-button" type="submit">SIGNUP</button>


        <Link to="/login"
          className="login-link"
        >
          Done registering? Back to login!
        </Link>

        {message && <p>{message}</p>}
      </form>
    </div>
    </div>
    </div>
  );
};

/*
const styles = {
  container: { display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" },
  form: { display: "flex", flexDirection: "column", padding: "2rem", background: "#fff", borderRadius: "8px", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" },
  input: { margin: "0.5rem 0", padding: "0.5rem", fontSize: "1rem" },
  button: { padding: "0.5rem", marginTop: "1rem", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" },
};

*/
export default Signup;