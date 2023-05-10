import "./Error.scss";

const Error = ({error}) => {
    return(
        <span className="error">
            <span className="error-icon material-symbols-outlined">
            error
            </span>
            {error}
        </span> 
    )
}

export default Error;