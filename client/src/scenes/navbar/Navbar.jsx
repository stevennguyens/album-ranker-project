import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { logout } from "spotify.js"
const Navbar = ({token}) => {
    console.log(token)
    // const [token, setToken] = useState(null);
    // useEffect(() => {
    //     console.log(accessToken)
    //     setToken(accessToken)
    // }, []);
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch;
    const navigate = useNavigate();
    const code = new URLSearchParams(window.location.search).get("code")
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
    return(
        <div id="navbar">
            <span onClick={() => navigate("/home")}>
                Muserank
            </span>
            {!token ?
            (<span>
                <a href="http://localhost:3001/login">
                   Log in 
                </a>
                
            </span>)
            : 
            (<span>
                <a href="#" onClick={logout}>
                   Log out
                </a>
                
            </span>)
            }
        </div>
    )
}

export default Navbar