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
        <div className='post-container'>
            <div className='post-detail'>
                {/* add user's logo ?? */}
                <small>posted by {post.author} | {new Date(post.created_at).toLocaleString()}</small>
            </div>

            <div className='title'>
                <h3>{post.title}</h3>
            </div>

            <div className='location'>
                <h4>{post.location}</h4>
            </div>

            <div className='description'>
                <p>{post.desc}</p>

            </div>

            <div className='post-comments'>
                {comments.map(c=> (
                    <div key={c.id} className="comment">
                        <p><strong>{c.author || "Anon"}:</strong> {c.body}</p>
                        <small>{new Date(c.created_at).toLocaleString()}</small>
                    </div>
                ))}
            {/* adding button for user to add comments */}

            <form onSubmit={addComment}>
                <input value={body} onChange={(e)=>setBody(e.target.value)} placeholder="Write a comment..." />
                <button type="submit">Add Comment</button>
            </form>

            </div>
            
        </div>
    )
}
export default ForumPost;