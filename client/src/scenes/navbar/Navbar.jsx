import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { logout } from "spotify.js";
import { SERVER_URL } from "constants";

const Navbar = ({token}) => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const access_token = new URLSearchParams(window.location.search).get("access_token");
        if (access_token) {
            navigate("/home");
        }
    }, []);

    const handleLogout = () => {
        logout();
    }
    const navigateHome = () => {
        if (location.pathname !== '/home') {
            navigate("/home");
        }
    }
    return(
        <div id="navbar">
            <span onClick={navigateHome}>
                Muserank
            </span>
            {!token ?
            (<span>
                <a href={`${SERVER_URL}/login`}>
                   Log in 
                </a>
                
            </span>)
            : 
            (<span>
                <a href="#" onClick={handleLogout}>
                   Log out
                </a>
                
            </span>)
            }
        </div>
    )
}

export default Navbar