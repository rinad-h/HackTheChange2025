const API = {
  base: "http://localhost:5000",

  async listPosts() {
    const r = await fetch(`${this.base}/posts`);
    if (!r.ok) throw new Error("Failed to load posts");
    return r.json();
  },

  async createPost(data) {
    const r = await fetch(`${this.base}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error("Failed to create post");
    return r.json();
  },

  async listComments(postId) {
    const r = await fetch(`${this.base}/posts/${postId}/comments`);
    if (!r.ok) throw new Error("Failed to load comments");
    return r.json();
  },

  async addComment(postId, data) {
    const r = await fetch(`${this.base}/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    if (!r.ok) throw new Error("Failed to add comment");
    return r.json();
  },
};
export default API;
