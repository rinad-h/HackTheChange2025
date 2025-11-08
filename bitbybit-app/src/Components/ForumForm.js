import React, {useState} from 'react';

const ForumForm = () => {

    const [selectedSection, setSelectedSection] = useState(""); //initial state for checkbox is empty string
    //function to handle selecting a section from dropdown
    const handleChange = (e) => {
        setSelectedSection(e.target.value);
    }
    return(
        <div className='post' >
            <div className='title'>
                <input type='text'placeholder='Title' />

            </div>
            <div className='Location'>
                <input type= 'text' placeholder='Add Location'/>
            </div>
            <div className='Forum-Options'>
                <label>
                    <select name="selectedSection" value={selectedSection} onChange={handleChange}>
                        <option value="crime">Crime</option>
                        <option value="transport">Transportation</option>
                        <option value="accessibility">Accessibility</option>
                        <option value="community">Community Events</option>
                        <option value="business">Small Business</option>
                    </select>
                </label>
               
            </div>
            <div className='Description'>
                <input type='text' placeholder='What Do You Want To Say?' />
            </div>

            <button>Submit</button>
            
            
        </div>
    )
}

export default ForumForm;