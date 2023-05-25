import "./Button.scss";

// back button component to return to previous page
// @params handleClick      function to handle click of back button
const BackButton = ({handleClick}) => {
    return(
        <span onClick={handleClick} class="material-symbols-outlined back-btn">
            arrow_back
        </span>)
}

export default BackButton