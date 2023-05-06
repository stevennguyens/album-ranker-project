import RankListImage from "components/RankList/RankListImage";
import "./RankListPage.scss";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ListItem from "components/ListItem/ListItem";
import { useState, useEffect } from 'react';
import Dropdown from "components/Dropdown/Dropdown";
import DropdownItem from "components/Dropdown/DropdownItem";
import BackButton from "components/Buttons/BackButton";
import MoreButton from "components/Buttons/MoreBtn";

const RankListPage = () => {
    const navigate = useNavigate();
    const {ranklistId} = useParams();
    const {state} = useLocation();

    return (
        <div className="ranklist-page">
            <div className="back-btn-div">
                <BackButton handleClick={() => navigate(-1)}/>
            </div>

            <RankListImage className="ranklist-image" items={state.items}/>
            
            <h1>{state.name}</h1>
            
            <MoreButton> 
                <DropdownItem itemName="Edit details"/>
            </MoreButton>


            <div className="ranklist">
                {state.items.map((item, i) => {
                    return(
                        <ListItem key={i} index={i} item={item} handleItemClick={() => ""}></ListItem>
                    )
                })}
            </div>
        </div>
    )
}

export default RankListPage