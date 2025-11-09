import React, { useState } from "react";
import Navbar from "./Navbar";
import EventMap from "./EventMap";
import EventForum from "./EventForum";

const Event = ({ currentUser }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [posts, setPosts] = useState([]);

  return (
    <div style={styles.container}>
      <Navbar />
      <main style={styles.content}>
        <div style={styles.forumSection}>
          <EventForum
            selectedLocation={selectedLocation}
            currentUser={currentUser}
            onPostAdded={(newPost) => setPosts((prev) => [...prev, newPost])}
          />
        </div>
        <div style={styles.mapContainer}>
          <EventMap
            posts={posts}
            selectedLocation={selectedLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "Arial, sans-serif", backgroundColor: "#f8fafc" },
  content: { display: "flex", flexGrow: 1, marginTop: "80px" },
  forumSection: { width: "35%", padding: "1rem", overflowY: "auto" },
  mapContainer: { width: "65%", height: "calc(100vh - 80px)" },
};

export default Event;
