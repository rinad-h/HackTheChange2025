import React, {useState, useEffect} from 'react';
import ForumForm from "../Components/ForumForm";
import ForumPost from "../Components/ForumPost";
import Comment from "../Components/Comment";

import API from "../apiController";

const ForumPage = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [posts, setPosts] = useState([]);

    const togglePopup = () =>{
        setShowPopup(!showPopup);
    }

    const loadPosts = async () => {
        const rows = await API.listPosts();
        setPosts(rows);
    };

    useEffect(() => {loadPosts();}, []);
    return(
        <div>
            <div className='Forum-Comments'>

            </div>
            <button onClick={togglePopup}>Add New Forum</button>
           {showPopup &&  <ForumForm onCreated={() => {loadPosts(); setShowPopup(false); }} /> }

            {posts.map(p => <ForumPost key={p.id} post={p} />)}
          
        </div>
    )
}

export default ForumPage;