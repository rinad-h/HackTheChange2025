import React, {useState} from 'react';
import ForumForm from "../Components/ForumForm";
import ForumPost from "../Components/ForumPost";
import Comment from "../Components/Comment";

const ForumPage = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () =>{
        setShowPopup(!showPopup);
    }
    return(
        <div>
            <div className='Forum-Comments'>

            </div>
            <button onClick={togglePopup}>Add New Forum</button>
           {showPopup &&  <ForumForm /> }
          
           
           <ForumPost />
           <Comment />
        </div>
    )
}

export default ForumPage;