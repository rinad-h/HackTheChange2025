import React, { useState, useEffect, useRef } from "react";
import logo from "../images/logo.png"; 
import profile from "../images/profile.png"; 
import title from "../images/title.png"; 

const navItems = [
    { label: "Transportation", route: "/transport" },
    { label: "Crime", route: "/crime" },
    { label: "Small Businesses", route: "/business" },
    { label: "Community Events", route: "/events" },
  ];

const Navbar = ({onNavigate, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header style={styles.navbar}>
      <div style={styles.leftGroup}>
        <img src={logo} alt="Logo" style={styles.logo} />
        <img src={title} alt="Bit by Bit" style={styles.title} />
      </div>

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

      <div style={styles.rightGroup}>
        <img
          src={profile}
          alt="Profile"
          style={styles.profileIcon}
          onClick={() => setDropdownOpen((prev) => !prev)}
        />
        {dropdownOpen && (
          <button style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        )}
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
    backgroundColor: "#99b3FF",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    zIndex: 1000,
    fontFamily: "'Elms Sans', sans-serif",
  },
  leftGroup: { display: "flex", alignItems: "center" },
  centerGroup: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    gap: "1.5rem",
  },
  rightGroup: { display: "flex", alignItems: "center", position: "relative" },
  logo: { width: "45px", height: "40px", marginRight: "0.5rem" },
  title: { height: "40px", marginRight: "0.5rem" },
  navItemButton: {
    background: "transparent",
    border: "none",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontFamily: "'Elms Sans', sans-serif",
  },
  profileIcon: {
    width: "45px",
    height: "40px",
    borderRadius: "50%",
    cursor: "pointer",
  },
  logoutButton: {
    position: "absolute",
    top: "50px",
    right: 0,
    padding: "0.3rem 0.6rem",
    backgroundColor: "#e53935",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.9rem",
    whiteSpace: "nowrap",
    zIndex: 1001,
  },
};

export default Navbar;
