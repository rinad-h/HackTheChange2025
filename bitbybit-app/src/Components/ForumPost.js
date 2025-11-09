import React, {useState, useEffect} from 'react';
import API from "../apiController";

const ForumPost = ({post}) => {

    const [comments, setComments] = useState([]);
    const [body, setBody] = useState("");

    const load = async () => {
        const rows = await API.listComments(post.id);
        setComments(rows);
    };

    useEffect(() => { load();}, [post.id]);

    const addComment = async (e) => {
        e.preventDefault();
        if(!body.trim()) return;
        await API.addComment(post.id, { body, author:"Anon"});
        setBody("");
        load();
    };


    return(
        <div className='post-container' style={styles.postContainer}>

            <div className='title' style={styles.title}>
                <h3 style={styles.titleText}>{post.title}</h3>
            </div>
            <div className='post-detail' style={styles.postDetail}>
                {/* add user's logo ?? */}
                <small>posted by {post.author} | {new Date(post.created_at).toLocaleString()}</small>
            </div>

            <div className='location' style={styles.location}>
                <h4>{post.location}</h4>
            </div>

            <div className='description' style={styles.description}>
                <p>{post.desc}</p>

            </div>

            <div className='post-comments'>
                <h4 style={styles.commentHeader}>Comments</h4>

                {comments.map(c=> (
                    <div key={c.id} className="comment" style={styles.commentBox}>
                        <p style={styles.commentBody}><strong>{c.author || "Anon"}:</strong> {c.body}</p>
                        <small style={styles.commentDate}>{new Date(c.created_at).toLocaleString()}</small>
                    </div>
                ))}
            {/* adding button for user to add comments */}

            <form onSubmit={addComment} style={styles.commentForm}>
                <input style={styles.commentInput} value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Write a comment..." />
                <button type="submit" style={styles.commentButton}>Add</button>
            </form>

            </div>
            
        </div>
    )
}
export default ForumPost;

const styles = {
    postContainer: {
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    padding: "1rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    borderLeft: "6px solid #99b3FF",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    marginBottom: "0.3rem",
  },
  titleText: {
    color: "#233b81ff",
    margin: 0,
  },

  postDetail: {
    fontSize: "0.8rem",
    color: "#777",
    marginBottom: "0.5rem",
  },

  location: {
    fontSize: "1rem",
    fontWeight: "500",
    color: "#2b4a9e",
    marginBottom: "0.5rem",
  },

  description: {
    fontSize: "0.95rem",
    color: "#333",
    lineHeight: "1.4",
    marginBottom: "1rem",
  },

  postComments: {
    borderTop: "1px solid #eee",
    paddingTop: "0.8rem",
  },

  commentHeader: {
    marginBottom: "0.5rem",
    color: "#233b81ff",
  },

  commentBox: {
    backgroundColor: "#f5f7ff",
    padding: "0.5rem 0.8rem",
    borderRadius: "8px",
    marginBottom: "0.5rem",
  },

  commentBody: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#333",
  },

  commentDate: {
    fontSize: "0.75rem",
    color: "#666",
  },

  commentForm: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginTop: "0.8rem",
  },

  commentInput: {
    flex: 1,
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "0.9rem",
  },

  commentButton: {
    backgroundColor: "#99b3FF",
    border: "none",
    width: "50px",
    borderRadius: "6px",
    padding: "8px 12px",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },

}