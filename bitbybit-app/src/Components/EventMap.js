import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, useMapEvent } from "react-leaflet";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';
import API from "./apiController";

function LocationSelector({ setSelectedLocation }) {
  useMapEvent("click", (e) => setSelectedLocation(e.latlng));
  return null;
}

const EventMap = ({ selectedLocation, setSelectedLocation }) => {
  const [wards, setWards] = useState(null);
  const [posts, setPosts] = useState([]);

  // Fetch ward boundaries
  useEffect(() => {
    fetch("https://data.calgary.ca/resource/tz8z-hyaz.geojson", {
      headers: { "X-App-Token": "DR94aUoEspVNZCjw2Mi2intnA" },
    })
      .then((res) => res.json())
      .then((data) => setWards(data))
      .catch((err) => console.error("Failed to load ward boundaries:", err));
  }, []);

  // Load event posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await API.listPosts();
        setPosts(allPosts.filter((p) => p.category === "events" && p.lat && p.lng));
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };
    loadPosts();
  }, []);

  // Ward styling
  const handleWardFeature = (feature, layer) => {
    layer.setStyle({ color: "#e91e63", weight: 2, fillOpacity: 0.05 }); // pink theme
    layer.on({
      mouseover: () => layer.setStyle({ fillOpacity: 0.2 }),
      mouseout: () => layer.setStyle({ fillOpacity: 0.05 }),
    });
  };

  return (
    <MapContainer center={[51.05, -114.05]} zoom={10} style={{ height: "100vh", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {wards && <GeoJSON data={wards} onEachFeature={handleWardFeature} />}
      
      {posts.map((post) => (
        <Marker
          key={post.id}
          position={[parseFloat(post.lat), parseFloat(post.lng)]}
          icon={L.icon({
            iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        />
      ))}

      <LocationSelector setSelectedLocation={setSelectedLocation} />
    </MapContainer>
  );
};

export default EventMap;
