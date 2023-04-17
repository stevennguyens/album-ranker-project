import "./Dropdown.scss";

const DropdownItem = ({itemName, handleClick}) => {
    return (
        <div onClick={(e) => handleClick(itemName)} className="dropdown-item">
            {itemName}
        </div>
    )
}

export default DropdownItem;