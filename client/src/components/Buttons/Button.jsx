import "./Button.scss";

const Button = ({text, handleClick, type}) => {
    return (
        <button type={type} onClick={(e) => handleClick(e)} className="btn">{text}</button>
    )
}

export default Button;