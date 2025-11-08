import React from "react";

const InfoCard = ({ icon, title, description }) => {
  return (
    <div style={styles.card}>
      <div style={styles.icon}>{icon}</div>
      <h3 style={styles.title}>{title}</h3>
      <p style={styles.description}>{description}</p>
    </div>
  );
};

const CommunityCards = () => {
  const cardsData = [
    {
      icon: "🚗",
      title: "Transportation",
      description: "Share updates or report issues on local routes.",
    },
    {
      icon: "🚓",
      title: "Crime & Safety",
      description: "Keep your neighborhood informed and vigilant.",
    },
    {
      icon: "🏪",
      title: "Small Businesses",
      description: "Promote and support local entrepreneurs.",
    },
    {
      icon: "🎉",
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
  },
  card: {
    backgroundColor: "#f8f9fb",
    borderRadius: "10px",
    padding: "1rem",
    width: "220px",
    textAlign: "center",
    transition: "transform 0.2s",
  },
  icon: {
    fontSize: "2rem",
    marginBottom: "0.5rem",
  },
  title: {
    fontSize: "1.2rem",
    marginBottom: "0.5rem",
  },
  description: {
    fontSize: "0.95rem",
    color: "#555",
  },
};

export default CommunityCards;
