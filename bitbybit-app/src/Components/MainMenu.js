import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Mission from "./Mission";
import About from "./About";
import CommunityCards from "./CommunityCards";

const MainMenu = ({ onLogout }) => {
  const navigate = useNavigate();

  const navItems = [
    { label: "Transportation", route: "/transport" },
    { label: "Crime", route: "/crime" },
    { label: "Small Businesses", route: "/business" },
    { label: "Community Events", route: "/events" },
  ];

  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.container}>
      <Navbar navItems={navItems} onNavigate={handleNavigate} onLogout={onLogout} />
      <Mission />
      <About />
      <CommunityCards />
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#c2d9f9ff",
    fontFamily: "Arial, sans-serif",
  },
};

export default MainMenu;
