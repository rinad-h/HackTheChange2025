const API = {
  base: "http://localhost:5000",

  // List all posts, optionally filter by category
  async listPosts(category) {
    let url = `${this.base}/posts`;
    if (category) url += `?category=${category}`; // append category query param if provided
    const r = await fetch(url);
    if (!r.ok) throw new Error("Failed to load posts");
    return r.json();
  },

  // Create a new post
  async createPost(data) {
    const r = await fetch(`${this.base}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) {
      const text = await r.text();
      console.error("Failed to create post. Server response:", text);
      throw new Error("Failed to create post");
    }
    return r.json();
  },

  // List comments for a post
  async listComments(postId) {
    const r = await fetch(`${this.base}/posts/${postId}/comments`);
    if (!r.ok) throw new Error("Failed to load comments");
    return r.json();
  },

  // Add a comment to a post
  async addComment(postId, data) {
    const r = await fetch(`${this.base}/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error("Failed to add comment");
    return r.json();
  },
};

export default API;
