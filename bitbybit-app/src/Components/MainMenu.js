import React from "react";
import Navbar from "./Navbar";

const MainMenu = ({ onLogout, onNavigate }) => {
  const navItems = [
    { label: "Transportation", route: "transport" },
    { label: "Crime", route: "crime" },
    { label: "Small Businesses", route: "business" },
    { label: "Accessibility", route: "access" },
    { label: "Community Events", route: "events" },
  ];

  return (
    <div style={styles.container}>
      <Navbar navItems={navItems} onNavigate={onNavigate} onLogout={onLogout} />
      <main style={styles.content}>
        <h2>Main Menu</h2>
        <p>Welcome — choose a section from the navigation above.</p>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    fontFamily: "Arial, sans-serif",
  },
  content: {
    paddingTop: "80px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
};

export default MainMenu;
