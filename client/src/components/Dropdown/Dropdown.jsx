import "./Dropdown.scss";
import { useEffect, useRef } from "react";
import * as React from 'react';

const Dropdown = ({toggleMenu, setToggleMenu, children}) => {
    const menuRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (toggleMenu && menuRef.current && !menuRef.current.contains(e.target) && e.target.id !== "add-btn") {
                setToggleMenu(false);
            }
        };
        window.addEventListener('mousedown', handler);
        return () => {
            window.removeEventListener('mousedown', handler);
        };
    }, [toggleMenu]);
    return(
        <div ref={menuRef} className="dropdown-div">
            {React.Children.map(children, child => {
                if (React.isValidElement(child)){
                    return React.cloneElement(child, {setToggleMenu})
                }
            })}
        </div>
    )
}

export default Dropdown;