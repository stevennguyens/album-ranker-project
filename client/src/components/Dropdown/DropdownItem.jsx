import "./Dropdown.scss";

const DropdownItem = ({itemName, handleClick, setToggleMenu}) => {
    return (
        <div onClick={(e) => {
                handleClick(itemName);
                setToggleMenu(false)
            }} 
            className="dropdown-item">
            {itemName}
        </div>
    )
}

export default DropdownItem;