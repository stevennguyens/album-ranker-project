import "./Dropdown.scss";
import { useEffect, useRef } from "react";

const Dropdown = ({toggleMenu, setToggleMenu, children}) => {
    const menuRef = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (toggleMenu && menuRef.current && !menuRef.current.contains(e.target)) {
                console.log("not contains")
                setToggleMenu(false);
            } else {
                console.log("contains")
            }
        };
        window.addEventListener('mousedown', handler);
        return () => {
            window.removeEventListener('mousedown', handler);
        };
    }, [toggleMenu]);
    return(
        <div ref={menuRef} className="dropdown-div">
            {children}
        </div>
    )
}

export default Dropdown;