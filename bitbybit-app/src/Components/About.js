import React, { useState } from "react";
import calgary from "../images/CalgarySkyline.jpg"; // replace with your image

const About = () => {
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
        {/* Left: Text */}
        <div style={styles.textSection}>
          <h2 style={styles.heading}>Our Story</h2>
          <p style={styles.paragraph}>
            During and after the pandemic, many of us felt disconnected from our communities. Neighbors became strangers, local events went unnoticed, and safety concerns were often shared too late. We wanted to change that.
          </p>
          <p style={styles.paragraph}>
            Bit By Bit was born out of a desire to rebuild that sense of connection: to create a platform where Calgarians can stay informed, engaged, and empowered. 
          </p>
        </div>

        {/* Right: Image */}
        <div style={styles.imageSection}>
          <img src={calgary} alt="About Bit By Bit" style={styles.image} />
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
    padding: "2rem",
  },
  card: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
    borderRadius: "25px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    width: "85%",          
    maxWidth: "1100px",     
    padding: "3rem 2rem",
    gap: "3rem",
    cursor: "pointer", // show pointer on hover
  },
  textSection: {
    flex: 2,
    color: "#333",
    textAlign: "center",
  },
  imageSection: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  image: {
    height: "300px",
    objectFit: "contain",
    borderRadius: "5%",
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
    marginBottom: "1rem",
  },
};

export default About;
