import React, {useState} from 'react';

import API from "../apiController";

const ForumForm = ({onCreated}) => {
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("crime");
    const [desc, setDesc] = useState("");
    const [author, setAuthor] = useState("Anonymous");
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");

    //submit function to add post to forum

    const submit = async(e) => {
        e.preventDefault();
        setErr("");
        setLoading(true);

        try {
            const post = await API.createPost({title, location, category, desc, author});
            onCreated?.(post); //tell parent to refresh list
            setTitle(""); setLocation(""); setCategory("crime"); setDesc("");
        } catch(e){
            setErr(String(e.message || e));
        } finally{
            setLoading(false);
        }
    };


    return(
        <form className='post' onSubmit={submit} >
            <div className='title' >
                <input style={styles.inputBox} value={title} onChange={(e) => setTitle(e.target.value)} type='text'placeholder='Title' required/>

            </div>
            <div className='Location'>
                <input style={styles.inputBox} value={location} onChange={(e) => setLocation(e.target.value)} type= 'text' placeholder='Add Location'/>
            </div>
            <div className='Forum-Options'>
                <label>
                    <select style={styles.inputBox} value={category} name="selectedSection" onChange={(e) => setCategory(e.target.value)}>
                        <option value="crime">Crime</option>
                        <option value="transport">Transportation</option>
                        <option value="accessibility">Accessibility</option>
                        <option value="community">Community Events</option>
                        <option value="business">Small Business</option>
                    </select>
                </label>
               
            </div>
            <div className='Description'>
                <input style={styles.inputBox} value={desc} type='text' placeholder='What Do You Want To Say?' onChange={(e) => setDesc(e.target.value)} required />
            </div>

            <button style={styles.submit} type='submit' disabled={loading}>{loading ? "Submitting..." : "Submit"}</button>
            
            
        </form>
    )
}

export default ForumForm;

const styles = {
    inputBox: {
        width: "90%",
        padding: "10px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        outline: "none",
        fontSize: "14px",
        color: "#333",
        backgroundColor: "#f9f9ff",
        

    },

    submit: {
        width: "100px",
        display: "block",
        color: "white",
        height: "30px",
        margin: "20px auto",
        borderColor: "#2196F3",
        borderRadius: "10px",
        backgroundColor: "#99b3FF",

    },


}