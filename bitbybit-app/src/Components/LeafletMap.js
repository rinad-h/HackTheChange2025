import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";

export default function LeafletMap() {
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
      click: () => alert(`Clicked ward: ${feature.properties.label}`),
      mouseover: () => layer.setStyle({ fillOpacity: 0.2 }),
      mouseout: () => layer.setStyle({ fillOpacity: 0.1 })
    });
  };

  return (
    <MapContainer
      center={[51.05, -114.05]}
      zoom={11}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {wards && <GeoJSON data={wards} onEachFeature={handleEachFeature} />}
    </MapContainer>
  );
}
