import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Mission from "./Mission";
import About from "./About";
import CommunityCards from "./CommunityCards";

const MainMenu = ({ onLogout }) => {
  const navigate = useNavigate();



  const handleNavigate = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.container}>
      <Navbar onNavigate={handleNavigate} onLogout={onLogout} />
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
