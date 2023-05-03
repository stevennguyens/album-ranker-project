import ListItem from "components/ListItem/ListItem";
import "../loginPage/Form.scss";
import Search from "components/Search/Search";
import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { accessToken } from "spotify";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import update from 'immutability-helper';
import DraggableListItem from "components/ListItem/DraggableListItem";
import SearchResult from "components/Search/SearchResult";
import Button from "components/Buttons/Button";

const RankListForm = () => {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState();
    const [trackSearchResult, setTrackSearchResult] = useState();
    const [albumSearchResult, setAlbumSearchResult] = useState();
    const [artistSearchResult, setArtistSearchResult] = useState();
    const [ranklist, setRankList] = useState([]);
    const [showSearch, setShowSearch] = useState(true);

    let {type} = useParams();
    type = type.substring(0, type.length - 1);
    const types = [type]
    if (type === "track") {
        types.push("album")
    } else if (type === "album") {
        types.push("artist")
    }
    useEffect(() => {
        fetchSearchResult()
    }, [searchQuery]);

    useEffect(() => {
        if (showSearch === false) {
            setSearchQuery("")
        }
    }, [showSearch])
    
    const handleOnChange = (e) => {
        e ? setSearchQuery(e.target.value) : setSearchQuery("")
    }

    const fetchUserId = async () => {
        const response = await fetch(`https://api.spotify.com/v1/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        const data = await response.json()
        return data.id
    }

    const fetchSearchResult = async () => {
        if (searchQuery) {
            const response = await fetch (
                `https://api.spotify.com/v1/search?query=${searchQuery}&type=${types.join("%2C")}&locale=en-US%2Cen%3Bq%3D0.9&offset=0&limit=10&access_token=${accessToken}`,
            )
            const data = await response.json();
            if (data.albums) {
                setAlbumSearchResult(data.albums.items)
            } else {
                setAlbumSearchResult("")
            }
            if (data.artists) {
                setArtistSearchResult(data.artists.items)
            } else {
                setArtistSearchResult("")
            }
            if (data.tracks) {
                setTrackSearchResult(data.tracks.items)
            } else {
                setTrackSearchResult("")
            }
        } else {
            setAlbumSearchResult("")
            setArtistSearchResult("")
            setTrackSearchResult("")
        }
    }

    const handleItemClick = (item) => {
        if (item.type === type) {
            setRankList([...ranklist, item])
        } else {
            if (type =="track" && item.type === "album") {
                fetchTracksFromAlbum(item.id)
            } else if (type="album" && item.type === "artist") {
                fetchAlbumsFromArtist(item.id)
            }   
        }
        
    }

    const fetchTracksFromAlbum = async (id) => {
        const response = await fetch(
            `https://api.spotify.com/v1/albums/${id}/tracks`, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        const data = await response.json();
        const trackIds = data.items.map(item => item.id)
        const tracksResponse = await fetch(
            `https://api.spotify.com/v1/tracks?ids=${trackIds.join()}`, 
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        const tracksData = await tracksResponse.json()
        setRankList([...ranklist, ...tracksData.tracks])
    }

    const fetchAlbumsFromArtist = async(id) => {
        const response = await fetch(
            `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`,
            {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
        const data = await response.json();
        setRankList([...ranklist, ...data.items])
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

    const createRanklist = async () => {
        if (ranklist.length) {
            const userId = await fetchUserId()
            const name = "Ranklist"
            const response = await fetch (
                'http://localhost:3001/ranklists/add-ranklist',
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({userId:userId, name:name, items:ranklist, type:type})
                }
            );
            const data = await response.json();
            if (data) {
                navigate("/home");
            }
            console.log(data);
        }  
    }

    const handleBackBtnClick = () => {
        navigate('/home');
    }

    return(
        <DndProvider backend={HTML5Backend} className="ranklist-form-div">
            <div className="ranklist-form-div">
                <span onClick={() => handleBackBtnClick()}className="material-symbols-outlined back-btn">
                    arrow_back
                </span>
                <h1 className="name">Ranklist</h1>
                
                <div className="ranklist-div">
                    {ranklist.map((item, i)=> renderItem(item, i))}
                </div>
                
                { showSearch ? 
                    <div className="search-div">
                        <div className="search-bar-div">
                            <Search handleOnChange={handleOnChange} placeholder={`Search for ${['a', 'e', 'i', 'o', 'u'].includes(type[0].toLowerCase()) ? "an" : "a"} ${
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
                    </span>
                }

                <Button handleClick={() => createRanklist()} text="Add ranklist"/>
                
            </div>

        </DndProvider>
    )
}
// when add, attach spoify user id?
export default RankListForm;