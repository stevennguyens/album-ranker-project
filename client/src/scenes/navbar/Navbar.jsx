import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { logout } from "spotify.js";

const Navbar = ({token}) => {
    const navigate = useNavigate();
    const location = useLocation();
    const SERVER_URL = "https://museranker-server.onrender.com"
    useEffect(() => {
        const access_token = new URLSearchParams(window.location.search).get("access_token");
        if (access_token) {
            navigate("/home");
        }
    }, []);
    // const code = new URLSearchParams(window.location.search).get("access_token")
    // console.log("CODE: " + code);
    // const login = async () => {
    //     const response = await fetch(
    //         "http://localhost:3001/login/",
    //         {
    //             method: "GET",
    //             mode: "cors",
    //             headers: {"Content-Type": "application/x-www-form-urlencoded."},
    //         }
    //     )
    //     const json = await response.json()
    //     console.log(json);
    // }
    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user);
    //const isNonMobileScreens = useMediaQuery("(min-width: 1000px)"); 
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