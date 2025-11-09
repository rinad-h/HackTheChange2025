import React, { useState } from "react";
import fulllogo from "../images/logo.png";

const Mission = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div style={styles.container}>
      <div
        style={{
          ...styles.card,
          boxShadow: isHovered
            ? "0 0 40px 8px #99b3FF" // glowing effect on hover
            : "0 8px 20px rgba(0,0,0,0.1)",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div style={styles.logoSection}>
          <img src={fulllogo} alt="Logo" style={styles.logo} />
        </div>

        <div style={styles.textSection}>
          <h2 style={styles.heading}>Building Calgary, Bit by Bit</h2>
          <p style={styles.paragraph}>
            At Bit By Bit, our mission is to strengthen Calgary communities by 
            fostering connection, safety, and inclusivity. We provide residents 
            across every Calgary ward with a platform to share updates, support 
            local businesses, discover events, and stay informed about neighborhood
            safety: helping make Calgary a more connected, resilient, and vibrant 
            city for everyone.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "calc(100vh - 80px)", 
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Elms Sans', sans-serif",
    marginTop: "80px",
    padding: "2rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "85%",       
    maxWidth: "1100px",    
    padding: "3rem 2rem",
    gap: "2rem",
    cursor: "pointer", // pointer on hover
  },
  logoSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: "250px",
    height: "auto",
    objectFit: "contain",
    borderRadius: "30%",
  },
  textSection: {
    flex: 2,
    color: "#333",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#4B70E2",
    marginBottom: "1.5rem",
  },
  paragraph: {
    fontSize: "1.15rem",
    lineHeight: "1.8",
    color: "#555",
  },
};

export default Mission;
