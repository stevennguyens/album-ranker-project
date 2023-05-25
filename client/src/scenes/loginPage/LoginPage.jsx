import { SERVER_URL } from "constants";
import "./LoginPage.scss";
const LoginPage = () => {
    return(
        <div className="login">
            <a href={`${SERVER_URL}/login`}>Log in to Spotify</a>
        </div>
        
    )
}

export default LoginPage