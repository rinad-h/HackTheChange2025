import React, { useState } from "react";
import transpo from "../images/transpo.png";
import crime from "../images/crime.png";
import sb from "../images/sb.png";
import community from "../images/community.png";

const InfoCard = ({ icon, title, description }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        boxShadow: isHovered ? "0 0 15px 5px #99b3FF" : "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={styles.icon}>
        {typeof icon === "string" ? icon : icon}
      </div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

const CommunityCards = () => {
  const cardsData = [
    {
      icon: <img src={transpo} alt="Transportation" style={styles.logo} />,
      title: "Transportation",
      description: "Share updates or report issues on local routes.",
    },
    {
      icon: <img src={crime} alt="Crime & Safety" style={{ width: "90px", height: "90px" }} />,
      title: "Crime & Safety",
      description: "Keep your neighborhood informed and vigilant.",
    },
    {
      icon: <img src={sb} alt="Small Businesses" style={styles.logo} />,
      title: "Small Businesses",
      description: "Promote and support local entrepreneurs.",
    },
    {
      icon: <img src={community} alt="Community Events" style={styles.logo} />,
      title: "Community Events",
      description: "Discover and share happenings around your ward.",
    },
  ];

  return (
    <div style={styles.container}>
      {cardsData.map((card, index) => (
        <InfoCard
          key={index}
          icon={card.icon}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "1rem",
    backgroundColor: "#e6ffff",
    fontFamily: "'Elms Sans', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    border: "4px solid #99b3FF",
    borderRadius: "10px",
    padding: "1rem",
    width: "220px",
    textAlign: "center",
    transition: "all 0.3s ease", 
    fontFamily: "'Elms Sans', sans-serif",
    cursor: "pointer",
  },
  icon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  logo: {
    width: "95px",
    height: "90px",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
    fontFamily: "'Elms Sans', sans-serif",
  },
  description: {
    fontSize: "0.95rem",
    color: "#555",
    fontFamily: "'Elms Sans', sans-serif",
  },
};

export default CommunityCards;
