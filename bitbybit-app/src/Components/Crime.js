import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import ForumPage from "../Pages/ForumPage";

const LeafletMap = () => {
  const [wards, setWards] = useState(null);

  useEffect(() => {
    fetch("https://data.calgary.ca/resource/tz8z-hyaz.geojson", {
      headers: {
        "X-App-Token": "DR94aUoEspVNZCjw2Mi2intnA"
      }
    })
      .then(res => res.json())
      .then(data => setWards(data))
      .catch(err => console.error("Error fetching wards:", err));
  }, []);

  const handleEachFeature = (feature, layer) => {
    layer.setStyle({ color: "#007bff", weight: 2, fillOpacity: 0.1 });
    layer.on({
      click: () => alert(`Clicked ward: ${feature.properties.ward_name}`),
      mouseover: () => layer.setStyle({ fillOpacity: 0.2 }),
      mouseout: () => layer.setStyle({ fillOpacity: 0.1 })
    });
  };

  return (
    <MapContainer
     
      center={[51.05, -114.25]}
      zoom={10}
      style={{ height: "600px", width: "100%" }} 
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {wards && <GeoJSON data={wards} onEachFeature={handleEachFeature} />}
    </MapContainer>
  );
};

const Crime = ({ onBack, onLogout }) => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <button style={styles.backButton} onClick={onBack}>&larr; Back</button>
        <button style={styles.logoutButton} onClick={onLogout}>Logout</button>
      </header>

     
      <main style={styles.content}>
        
        <div style={styles.forumSection}>
          <ForumPage />
        </div>

        <div style={styles.mapContainer}>
            <LeafletMap />
        </div>

      </main>
    </div>
  );
};

const styles = {
  container: {
    // Added a specific height for the map to work well on the page
    minHeight: "100vh",
    backgroundColor: "#f8fafc",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0.5rem 1rem",
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    position: "sticky",
    top: 0,
    zIndex: 500,
  },
  backButton: {
    background: "transparent",
    border: "none",
    color: "#2196F3",
    fontWeight: "600",
    cursor: "pointer",
    fontSize: "1rem",
  },
  logoutButton: {
    padding: "0.4rem 0.8rem",
    backgroundColor: "#e53935",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  content: {
    padding: "1rem",
    flexGrow: 1, // Allows the content area to take up remaining space
  },
  mapContainer: {
    // Wrapper style for the map to control its size on the page
    position: "relative",
    height: "600px", 
    width: "100%",
    borderRadius: "8px",
    overflow: "hidden", // Keeps map within border radius
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    marginTop: "1rem",
  },

  forumSection: {
    position: "absolute",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "1rem",
    height: "400px", 
    width: "300px",
    overflowY: "auto",  // scrollable forum
    zIndex: 1000
  },
};

export default Crime;