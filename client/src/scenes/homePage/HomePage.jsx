import React from 'react';
import "./HomePage.scss";
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RankList from 'components/RankList/RankList';
import AddButton from 'components/Buttons/AddButton';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [ranklists, setRankLists] = useState([]);
    const navigate = useNavigate();
    // const getRankLists = async () => {
    //     const ranklists = await fetch(
    //         `http://localhost:3001/${user}/ranklists`,
    //         {
    //             method: "GET",
    //             headers: {Authorization: `Bearer: ${token}`}
    //         }
    //     )
    //     const data = await ranklists.json()
    //     console.log(data)
    //     dispatch(setRankLists({ranklists: data}))
    // }

    // useEffect(() => {
    //     getRankLists()
    // }, [])
    // getRankLists()
    // console.log(ranklists)
    const handleAddBtnClick = (type) => {
        navigate(`/add-ranklist/${type}`);
    }

    return(
        <div id='home-page'>
            <div className="header">
                <h4>My rankings</h4>
                <AddButton handleAddBtnClicked={handleAddBtnClick}/>
            </div>
            <div className="rank-lists">
                {/* {
                    ranklists.map(({
                        title,
                        rankList
                    }) => (
                        <RankList title={title}/>
                    ))} */}
            </div>
        </div>
    )
}

export default HomePage;