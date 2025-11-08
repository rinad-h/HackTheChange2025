import React from "react";

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
      <header style={styles.navbar}>
        <div style={styles.leftGroup}>
          {navItems.map((item) => (
            <button
              key={item.route}
              style={styles.navItemButton}
              onClick={() => (onNavigate ? onNavigate(item.route) : console.log(`${item.label} clicked`))}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div style={styles.rightGroup}>
          <button style={styles.logoutButton} onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

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
  navbar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "56px",
    backgroundColor: "#2196F3",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
    zIndex: 1000,
  },
  leftGroup: {
    display: "flex",
    gap: "0.25rem",
    alignItems: "center",
  },
  rightGroup: {
    display: "flex",
    alignItems: "center",
  },
  navItemButton: {
    background: "transparent",
    border: "none",
    color: "white",
    fontWeight: "600",
    padding: "0.5rem 0.75rem",
    cursor: "pointer",
    fontSize: "0.95rem",
  },
  logoutButton: {
    padding: "0.5rem 0.9rem",
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontWeight: "600",
  },
  content: {
    paddingTop: "80px",
    paddingLeft: "1rem",
    paddingRight: "1rem",
  },
};

export default MainMenu;
