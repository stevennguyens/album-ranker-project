import "./Button.scss";

const Button = ({text, handleClick}) => {
    return (
        <button onClick={handleClick} className="btn">{text}</button>
    )
}

export default Button;