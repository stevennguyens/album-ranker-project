import "../loginPage/Form.scss";
import Search from "components/Search/Search";
import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { accessToken, getUserId } from "spotify";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper';
import DraggableListItem from "components/ListItem/DraggableListItem";
import SearchResult from "components/Search/SearchResult";
import Button from "components/Buttons/Button";
import Error from "components/Error/Error";
import RankListImage from "components/RankList/RankListImage";
import { getRanklist } from "server";
import ListItem from "components/ListItem/ListItem";

// standard ranklist 
// props:
// type         type of ranklist
// name         name of ranklist
// ranklist     array of items in ranklist
// edit         boolean for if ranklist is being created/updated or viewed
const RankList = (props) => {
    const navigate = useNavigate();
    const [name, setName] = useState(props.name);
    const [searchQuery, setSearchQuery] = useState();
    const [trackSearchResult, setTrackSearchResult] = useState();
    const [albumSearchResult, setAlbumSearchResult] = useState();
    const [artistSearchResult, setArtistSearchResult] = useState();
    const [ranklist, setRankList] = useState(props.ranklist);
    const [showSearch, setShowSearch] = useState(true);
    const [error, setError] = useState("");

    const type = props.type
    const types = [type]
    if (type === "track") {
        types.push("album")
    } else if (type === "album") {
        types.push("artist")
    }
    useEffect(() => {
        props.edit && document.getElementById("name").select()
    }, [props.edit])

    useEffect(() => {
        fetchSearchResult()
    }, [searchQuery]);

    useEffect(() => {
        if (showSearch === false) {
            setSearchQuery("")
        }
    }, [showSearch])
    
    const handleOnNameChange = (e) => {
        e ? setName(e.target.value) : setName(""); 
    }
    
    useEffect(() => {
        name ? setError("") : setError("Name is required.")
    }, [name])

    const handleOnSearchChange = (e) => {
        e ? setSearchQuery(e.target.value) : setSearchQuery("")
    }

    const fetchSearchResult = async () => {
        if (searchQuery) {
            const response = await fetch (
                `https://api.spotify.com/v1/search?query=${searchQuery}&type=${types.join("%2C")}&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=10&access_token=${accessToken}`,
            )
            const data = await response.json();
            if (data.albums) {
                setAlbumSearchResult(data.albums.items.map((item) => formatItem(item)))
            } else {
                setAlbumSearchResult("")
            }
            if (data.artists) {
                setArtistSearchResult(data.artists.items.map((item) => formatItem(item)))
            } else {
                setArtistSearchResult("")
            }
            if (data.tracks) {
                setTrackSearchResult(data.tracks.items.map((item) => formatItem(item)))
            } else {
                setTrackSearchResult("")
            }
        } else {
            setAlbumSearchResult("")
            setArtistSearchResult("")
            setTrackSearchResult("")
        }
    }

    const formatItem = (item) => {
        const formattedItem = {
            id: item.id,
            type: item.type,
            image: item.type === "track" ? item.album.images[0].url : item.images[0].url,
            name: item.name,
        }
        if (item.type === "album") {
            formattedItem["artists"] = item.artists
            
        } else if (item.type === "track") {
            formattedItem["artists"] = item.artists
            formattedItem["album"] = item.album.name
        }
        return formattedItem
    }

    const handleItemClick = (item) => {
        if (item.type === type) {
            setRankList([...ranklist, item])
        } else {
            if (type === "track" && item.type === "album") {
                fetchTracksFromAlbum(item.id)
            } else if (type === "album" && item.type === "artist") {
                fetchAlbumsFromArtist(item.id)
            }   
        }
    }

    const fetchTracksFromAlbum = async (id) => {
        const response = await fetch(
            `https://api.spotify.com/v1/albums/${id}/tracks?limit=50`, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        const data = await response.json();
        const trackIds = data.items.map(item => item.id);
        const tracksResponse = await fetch(
            `https://api.spotify.com/v1/tracks?ids=${trackIds.join()}`, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        const tracksData = await tracksResponse.json()
        setRankList([...ranklist, ...tracksData.tracks.map((track) => formatItem(track))])
    }

    const fetchAlbumsFromArtist = async(id) => {
        const response = await fetch(
            `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album&limit=40`,
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        const data = await response.json();
        const dataItemsMap = new Map(data.items.map(item => [item.name, item]))
        const dataItems = [...dataItemsMap.values()]
        setRankList([...ranklist, ...dataItems.map((item) => formatItem(item))])
    }

    const moveItem = useCallback((dragIndex, hoverIndex) => {
        setRankList((prevList) => 
            update(prevList, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, prevList[dragIndex]],
                ],
            }))

    }, [ranklist])

    const removeItem = (index) => {
        setRankList((prevList) => prevList.filter((item, i) => index !== i))
    }

    const renderItem = useCallback(
        (item, index) => {
            return (
                <DraggableListItem
                    key={index}
                    index={index}
                    id={item.id}
                    item={item}
                    moveItem={moveItem}
                    removeItem={removeItem}
                />
            )
        },
        [],
    )

    const handleBackBtnClick = () => {
        navigate(-1);
    }
    
    return(
        <DndProvider backend={HTML5Backend}>
            <div className="buttons">
                <span onClick={handleBackBtnClick}className="material-symbols-outlined back-btn">
                arrow_back
                </span>
                {props.children}
            </div>
            <div className="ranklist-form-div">
                <header className="ranklist-header">
                    <RankListImage items={ranklist}/>
                    <div className="input">
                        <input style={!props.edit ? {pointerEvents: "none"} : {}} id="name" onChange={handleOnNameChange} type="text" className={`name ${props.edit ? "edit" : ""} ${error ? "name-error" : ""}`} aria-describedby="error" defaultValue={name} spellCheck="false" autoFocus={props.edit} autoComplete="off"></input>
                        { error 
                        && 
                        <Error error={error}/> }
                    </div>
                </header>
                
                <div className={props.edit ? "ranklist-div" : "ranklist-div uneditable"}>
                    {ranklist.map((item, i)=> props.edit 
                        ? renderItem(item, i) 
                        : <ListItem key={i} index={i} type={item.type} handleItemClick={""} item={item}/>)}
                </div>
                          
                { props.edit && 
                    <Button handleClick={() => props.handleClick({name: name, items: ranklist})} text={props.buttonText}/> }
                { props.edit && 
                (showSearch ? 
                    <div className="search-div">
                        <div className="search-bar-div">
                            <Search handleOnChange={handleOnSearchChange} placeholder={`Search for ${['a', 'e', 'i', 'o', 'u'].includes(type ? type[0].toLowerCase() : "") ? "an" : "a"} ${
                                types.map((typeVal, i) => {
                                    if (i === types.length - 1) return typeVal 
                                    else return typeVal + " or " 
                                }).join('')}`}/>
                            <p onClick={() => setShowSearch(false)} className="hide">hide</p>
                        </div>
                        
                        {types.map((typeVal, i) => {
                            let searchResult = ""
                            if (typeVal == "artist") {
                                searchResult = artistSearchResult
                            } else if (typeVal == "album") {
                                searchResult = albumSearchResult
                            } else if (typeVal == "track") {
                                searchResult = trackSearchResult
                            }
                            return(
                                <SearchResult 
                                    type={typeVal}
                                    key={i} 
                                    searchResult={searchResult} 
                                    handleItemClick={handleItemClick}/>
                            )
                        })}
                    </div>
                    :  
                    <span onClick={() => setShowSearch(true)} className="search-icon material-symbols-outlined">
                        search
                    </span>)
                }
            </div>

        </DndProvider>
    )
}
// when add, attach spoify user id?
export default RankList;