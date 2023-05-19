import "./Dropdown.scss";

const DropdownItem = ({itemName, handleClick, setToggleMenu, red}) => {
    return (
        <div onClick={(e) => {
                handleClick(itemName);
                setToggleMenu(false)
            }} 
            className={`dropdown-item ${red}`}>
            {itemName}
        </div>
    )
}

export default DropdownItem;