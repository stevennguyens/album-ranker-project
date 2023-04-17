import "../loginPage/Form.scss";
import Search from "components/Search/Search";
import { useState, useEffect } from 'react';
const RankListForm = () => {
    const [searchQuery, setSearchQuery] = useState();
    const [searchResult, setSearchResult] = useState();
    useEffect(() => {

    }, [searchQuery])
    const handleOnChange = (e) => {
        setSearchQuery(e.target.value)
        //console.log(e.target.value)
    }

    const fetchSearchResult = async () => {
        const response = await fetch('https://api.spotify.com/v1/search?query=')
    }
    return(
        <div className="ranklist-form-div">
            <Search handleOnChange={handleOnChange} />
            <form action="" className="ranklist-form">
                <button className="btn">Add ranklist</button>
            </form>
        </div>
    )
}

export default RankListForm;