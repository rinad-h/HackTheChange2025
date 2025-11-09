import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvent } from "react-leaflet";
import L from "leaflet";
import API from "./apiController"; // will filter small business posts

// Allows user to select location by clicking on map
function LocationSelector({ setSelectedLocation }) {
  useMapEvent("click", (e) => {
    setSelectedLocation(e.latlng);
  });
  return null;
}

const SmallBusMap = ({ posts, selectedLocation, setSelectedLocation }) => {
  const [wards, setWards] = useState(null);

  // Fetch Calgary wards GeoJSON
  useEffect(() => {
    fetch("https://data.calgary.ca/resource/tz8z-hyaz.geojson", {
      headers: { "X-App-Token": "DR94aUoEspVNZCjw2Mi2intnA" },
    })
      .then((res) => res.json())
      .then((data) => setWards(data))
      .catch((err) => console.error(err));
  }, []);

  // Ward styling and hover effect
  const handleWardFeature = (feature, layer) => {
    layer.setStyle({ color: "#28a745", weight: 2, fillOpacity: 0.1 });
    layer.on({
      mouseover: () => layer.setStyle({ fillOpacity: 0.2 }),
      mouseout: () => layer.setStyle({ fillOpacity: 0.1 }),
    });
  };

  return (
    <MapContainer center={[51.05, -114.05]} zoom={11} style={{ height: "100%", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      
      {wards && <GeoJSON data={wards} onEachFeature={handleWardFeature} />}
      
      {posts
        .filter((p) => p.lat && p.lng && p.category === "smallbus")
        .map((post) => (
          <Marker
            key={post.id}
            position={[parseFloat(post.lat), parseFloat(post.lng)]}
            icon={L.icon({
              iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
              iconSize: [25, 41],
              iconAnchor: [12, 41],
            })}
          >
            <Popup>
              <strong>{post.title}</strong>
              <p>{post.desc}</p>
              <p>
                <em>{post.author}</em> | {new Date(post.created_at).toLocaleString()}
              </p>
              <small>{post.location}</small>
            </Popup>
          </Marker>
        ))}

      <LocationSelector setSelectedLocation={setSelectedLocation} />
    </MapContainer>
  );
};

export default SmallBusMap;
