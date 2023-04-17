const Search = ({handleOnChange}) => {
    return (
        <div className="search-div">
            <div className="search-bar">
                <input onChange={handleOnChange} type="text" className="search-input" />
                <p>Cancel</p>
            </div>
            <div className="search-result">

            </div>
        </div>
    )
}

export default Search