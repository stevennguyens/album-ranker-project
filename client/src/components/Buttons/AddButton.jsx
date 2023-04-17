import Dropdown from "components/Dropdown/Dropdown";
import "./Button.scss";
import { useNavigate } from 'react-router-dom';
import DropdownItem from "components/Dropdown/DropdownItem";
import { useState, useEffect, useRef } from 'react';

const AddButton = ({handleAddBtnClicked}) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="add-btn-div">
            <span onClick={() => setToggleMenu(!toggleMenu)} className="add-btn material-symbols-outlined">
                playlist_add
            </span>
            {toggleMenu ?
            (<Dropdown toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}>
                <DropdownItem itemName="tracks" handleClick={handleAddBtnClicked}/>
                <DropdownItem itemName="albums" handleClick={handleAddBtnClicked}/>
                <DropdownItem itemName="artists" handleClick={handleAddBtnClicked}/>
            </Dropdown>)
            :
            null
            }
        </div>
        
    )
}

export default AddButton
