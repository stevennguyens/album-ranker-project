import "./Search.scss";
import ListItem from "components/ListItem/ListItem";

const SearchResult = ({type, searchResult, handleItemClick}) => {
    return(
        <div className="search-result">
            <h3>{type+"s"}</h3>
            {searchResult ?
            (searchResult.map((item, i) => {
                return (
                    <ListItem key={i} handleItemClick={handleItemClick} item={item} type={type}></ListItem>
                )
            })) : null}
        </div>
    )
}

export default SearchResult