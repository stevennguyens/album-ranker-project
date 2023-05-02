import { useState } from "react"
import "./Search.scss"

const Search = ({handleOnChange, placeholder}) => {
    const [inputValue, setInputValue] = useState("")
    const clearInput = () => {
        setInputValue("")
        handleOnChange("")
    }
    return (
        <div className="search-bar">
            <input onChange={(e) => {handleOnChange(e); setInputValue(e.target.value)}} value={inputValue} type="text" className="search-input" placeholder={placeholder}/>
            <span onClick={clearInput} className="material-symbols-outlined close-icon" >
                close
            </span> 
        </div>
 
    )
}

export default Search