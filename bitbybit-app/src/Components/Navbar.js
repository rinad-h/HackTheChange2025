import React from "react";
import logo from "../images/logo.png"; 
import profile from "../images/profile.png"; 

const Navbar = ({ navItems, onNavigate, onLogout }) => {
  return (
    <header style={styles.navbar}>
      {/* Left: Logo + Site Name */}
      <div style={styles.leftGroup}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <span style={styles.siteName}>Bit by Bit</span>
      </div>

      {/* Center: Navigation Items */}
      <div style={styles.centerGroup}>
        {navItems.map((item) => (
          <button
            key={item.route}
            style={styles.navItemButton}
            onClick={() => onNavigate(item.route)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: Profile / Logout */}
      <div style={styles.rightGroup}>
        <img
          src={profile}
          alt="Profile"
          style={styles.profileIcon}
        />
      </div>
    </header>
  );
};

const styles = {
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "80px",
    backgroundColor: "#2196F3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    zIndex: 1000,
  },
  leftGroup: { display: "flex", alignItems: "center" },
  centerGroup: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    gap: "1.5rem",
  },
  rightGroup: { display: "flex", alignItems: "center" },
  logo: { width: "40px", height: "40px", marginRight: "0.5rem" },
  siteName: { color: "#fff", fontSize: "1.2rem", fontWeight: "bold" },
  navItemButton: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  profileIcon: {
    width: "50px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
  },
};

export default Navbar;
