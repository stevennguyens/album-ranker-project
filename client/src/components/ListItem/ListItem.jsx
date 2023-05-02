import "./ListItem.scss";
import { useDrag, useDrop } from 'react-dnd';
import { useState, useRef } from "react";

const ListItem = ({index, item, handleItemClick, removable, removeItem}) => {
    let imgSrc = ""

    switch(item.type) {
        case "track":
            imgSrc = item.album.images ? item.album.images[item.album.images.length - 1].url : "";
            break;
        case "album":
            imgSrc = item.images ? item.images[item.images.length - 1].url : "";
            break;
        case "artist":
            imgSrc = item.images.length ? item.images[item.images.length - 1].url : ""
            break;
    }
    return (
        <div onClick={() => handleItemClick(item)} className="list-item">
            <div className={removable ? "list-info removable" : "list-info"}>
                <div className="img-div">
                    { index >= 0 ?
                    <p className="index">{index + 1}</p> :
                    ""}
                    <img draggable="false" className="img" src={imgSrc}></img>
                </div>
                
                { item.type === "artist" 
                    ?
                    <div className="title artist-type">{item.name}</div>
                    :
                    <>
                        <div className="title">{item.name}</div>
                        <div className="album">{(item.album && item.album !== 'undefined') ? item.album.name : ""}</div>
                        <div className="artist">
                            {item.artists ? item.artists.map((artist, i) => 
                                (i == (item.artists.length - 1)) ?
                                artist.name : (artist.name+", ")
                            ):""}
                        </div>
                    </>
                }
                { removable 
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