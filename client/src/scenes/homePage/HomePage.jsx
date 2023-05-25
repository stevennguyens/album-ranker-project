import React from 'react';
import "./HomePage.scss";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RankListCard from 'components/RankList/RankListCard';
import AddButton from 'components/Buttons/AddButton';
import { useNavigate } from 'react-router-dom';
import { getUserId } from 'spotify';
import {getRanklists} from 'server';

// home page of app displays all of the user's ranklists
const HomePage = () => {
    const [ranklists, setRankLists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRanklists(setRankLists)
    }, [])

    const handleAddBtnClick = (type) => {
        navigate(`/add-ranklist/${type}`,
        {
            state: {
                size: ranklists.length
            }
        });
    }

    return(
        <div id='home-page'>
            <div className="header">
                <h4>My rankings</h4>
                <AddButton handleAddBtnClicked={handleAddBtnClick}/>
            </div>
            <div className="ranklist-card-div">
                {ranklists &&
                ranklists.map((list, i) => {
                    return (
                        <RankListCard key={i} item={list}/>
                    )
                })}
            </div>
        </div>
    )
}

export default HomePage;