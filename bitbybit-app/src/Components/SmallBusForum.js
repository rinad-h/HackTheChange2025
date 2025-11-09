import React, { useState, useEffect } from "react";
import API from "./apiController";

const SmallBusForum = ({ selectedLocation, currentUser, onPostAdded }) => {
  const [posts, setPosts] = useState([]);
  const [adding, setAdding] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const loadPosts = async () => {
    try {
      const allPosts = await API.listPosts("smallbus"); // only small business posts
      setPosts(allPosts);
    } catch (err) {
      console.error("Failed to load posts", err);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLocation) return alert("Please select a location on the map!");

    try {
      const newPost = await API.createPost({
        title,
        desc,
        category: "smallbus",
        location: `${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}`,
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        author: currentUser || "Anonymous",
      });

      setTitle("");
      setDesc("");
      setAdding(false);
      loadPosts();
      onPostAdded?.(newPost);
    } catch (err) {
      console.error("Failed to create post:", err);
      alert("Failed to create post. Check console for details.");
    }
  };

  return (
    <div style={{ width: "100%", height: "100%", overflowY: "auto", padding: "1rem" }}>
      {!adding && (
        <button onClick={() => setAdding(true)} style={styles.addButton}>
          Add Small Business Post
        </button>
      )}

      {adding && (
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Click on map to select location"
            value={
              selectedLocation
                ? `${selectedLocation.lat.toFixed(5)}, ${selectedLocation.lng.toFixed(5)}`
                : ""
            }
            readOnly
            style={styles.input}
          />
          <textarea
            placeholder="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            style={styles.textarea}
          />
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
        </form>
      )}

      <h3>Existing Small Business Posts</h3>
      {posts.map((p) => (
        <div key={p.id} style={styles.postBox}>
          <strong>{p.title}</strong>
          <p>{p.desc}</p>
          <p>
            <em>{p.author}</em> | {new Date(p.created_at).toLocaleString()}
          </p>
          <small>{p.location}</small>
        </div>
      ))}
    </div>
  );
};

const styles = {
  addButton: {
    width: "100%",
    padding: "0.5rem",
    marginBottom: "0.5rem",
    cursor: "pointer",
    backgroundColor: "#99b3FF",
    border: "none",
    borderRadius: "6px",
    fontFamily: "'Elms Sans', sans-serif",
    color: "white",
    fontSize: "20px",
  },
  form: { display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "1rem" },
  input: { padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc" },
  textarea: { padding: "0.5rem", borderRadius: "6px", border: "1px solid #ccc", minHeight: "80px" },
  submitButton: { backgroundColor: "#4CAF50", color: "white", border: "none", padding: "0.5rem", borderRadius: "6px", cursor: "pointer" },
  postBox: { padding: "0.5rem", marginBottom: "0.5rem", border: "1px solid #eee", borderRadius: "6px", backgroundColor: "#f5f7ff" },
};

export default SmallBusForum;
