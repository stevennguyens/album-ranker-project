import Dropdown from "components/Dropdown/Dropdown";
import "./Button.scss";
import DropdownItem from "components/Dropdown/DropdownItem";
import { useState, useEffect } from "react";

// more button component that opens a dropdown menu
// @params children     dynamically add dropdown menu items
const MoreButton = ({children}) => {
    const [toggleMenu, setToggleMenu] = useState(false);

    const handleClick = () => {
        if (!toggleMenu) setToggleMenu(true)
    }

    return ( 
        <div className="more-btn-div">
            { !toggleMenu ?
            <span onClick={handleClick} className="material-symbols-outlined more-btn">
            more_horiz
            </span>
            :
            <div>
                <span className="material-symbols-outlined more-btn active">
                    more_vert
                </span>
                {<Dropdown toggleMenu={toggleMenu} setToggleMenu={setToggleMenu}>
                    {children}
                </Dropdown>}
            </div>
            }
        </div>)
}

export default MoreButton