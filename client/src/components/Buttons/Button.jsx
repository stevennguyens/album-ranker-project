import "./Button.scss";

// button component
// @params text             text of button
// @params handleClick      function called when button is clicked
// @params type             type of button  
const Button = ({text, handleClick, type}) => {
    return (
        <button type={type} onClick={(e) => handleClick(e)} className="btn">{text}</button>
    )
}

export default Button;