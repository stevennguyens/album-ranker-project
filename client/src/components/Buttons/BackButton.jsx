import "./Button.scss";

const BackButton = ({handleClick}) => {
    return(
        <span onClick={handleClick} class="material-symbols-outlined back-btn">
            arrow_back
        </span>)
}

export default BackButton