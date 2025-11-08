import React from "react";

const MainMenu = ({ onLogout }) => {
  const navItems = [
    "Transportation",
    "Crime",
    "Small Businesses",
    "Accessibility",
    "Community Events",
  ];

  return (
    <div style={styles.container}>
      <header style={styles.navbar}>
        <div style={styles.leftGroup}>
          {navItems.map((item) => (
            <button
              key={item}
              style={styles.navItemButton}
              onClick={() => console.log(`${item} clicked`)}
            >
              {item}
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
