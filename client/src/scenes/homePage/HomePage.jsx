import React from 'react';
import "./HomePage.scss";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RankListCard from 'components/RankList/RankListCard';
import AddButton from 'components/Buttons/AddButton';
import { useNavigate } from 'react-router-dom';
import { getUserId } from 'spotify';

const HomePage = () => {
    const [ranklists, setRankLists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRankLists()
    }, [])

    const getRankLists = async () => {
        const userId = await getUserId();
        const response = await fetch(
            `http://localhost:3001/ranklists/${userId}`
        );
        const data = await response.json();
        if (data) {
            setRankLists(data.rankLists)
        }
    }

    const handleAddBtnClick = (type) => {
        navigate(`/add-ranklist/${type}`);
    }

    return(
        <div id='home-page'>
            <div className="header">
                <h4>My rankings</h4>
                <AddButton handleAddBtnClicked={handleAddBtnClick}/>
            </div>
            <div className="ranklist-card-div">
                {ranklists ?
                ranklists.map((list, i) => {
                    return (
                        <RankListCard key={i} item={list}/>
                    )
                })
                : ""
                }
            </div>
        </div>
    )
}

export default HomePage;