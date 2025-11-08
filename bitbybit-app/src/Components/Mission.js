import React from "react";
import logo from "../images/logo.png";

const Mission = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left: Logo */}
        <div style={styles.logoSection}>
          <img src={logo} alt="Logo" style={styles.logo} />
        </div>

        {/* Right: Mission Text */}
        <div style={styles.textSection}>
          <h2 style={styles.heading}>Our Mission</h2>
          <p style={styles.paragraph}>
            Our mission is to build a future where cities are inclusive, safe,
            and sustainable through the power of technology. We aim to empower
            communities by developing tools that bridge innovation with everyday
            life. By focusing on collaboration, accessibility, and environmental
            consciousness, we strive to reshape how people interact with their
            surroundings. Together, we’re creating urban spaces that thrive in
            harmony with their people, fostering resilience and connection at
            every step.
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: "calc(100vh - 80px)", // full page minus navbar
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fb",
    fontFamily: "'Elms Sans', sans-serif",
    padding: "2rem",
    marginTop: "80px",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "90%",
    maxWidth: "1200px",
    padding: "3rem 2rem",
    gap: "3rem",
  },
  logoSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    width: "300px",
    height: "auto",
    objectFit: "contain",
  },
  textSection: {
    flex: 1.2,
    color: "#333",
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
