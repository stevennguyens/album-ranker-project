import { useState } from "react";
import "./ListItem.scss";

const ListItem = ({index, item, handleItemClick, removable, removeItem}) => {
    const [showClose, setShowClose] = useState(false);
    const handleOnMouseEnter = () => {
        return removable && setShowClose(true) 
    }
    const handleOnMouseLeave = () => {
        return removable && setShowClose(false) 
    }
    return (
        <div onMouseEnter={handleOnMouseEnter} onMouseLeave={handleOnMouseLeave} onClick={() => handleItemClick(item)} className="list-item">
            <div className={removable ? "list-info removable" : "list-info"}>
                <div className="img-div">
                    { index >= 0 ?
                    <p className="index">{index + 1}</p> :
                    ""}
                    <img draggable="false" className="img" src={item.image}></img>
                </div>
                
                { item.type === "artist" 
                    ?
                    <div className="title type-artist">{item.name}</div>
                    :
                    <>
                        <div className="title">{item.name}</div>
                        <div className="album">{item.album ? item.album : ""}</div>
                        <div className="artist">
                            {item.artists ? item.artists.map((artist, i) => 
                                (i == (item.artists.length - 1)) ?
                                artist.name : (artist.name+", ")
                            ):""}
                        </div>
                    </>
                }
                { showClose
                    ? 
                    <span className="material-symbols-outlined" onClick={() => removeItem(index)}>
                    close
                    </span> 
                    : ""
                }
            </div>
        </div>
    )
}

export default ListItem