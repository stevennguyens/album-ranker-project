import RankListImage from "components/RankList/RankListImage";
import "./RankListPage.scss";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import ListItem from "components/ListItem/ListItem";
import { useState, useEffect } from 'react';
import Dropdown from "components/Dropdown/Dropdown";
import DropdownItem from "components/Dropdown/DropdownItem";
import BackButton from "components/Buttons/BackButton";
import MoreButton from "components/Buttons/MoreBtn";
import EditDialog from "components/Dialog/EditDialog/EditDialog";
import { getRanklist } from "server";
const RankListPage = () => {
    const navigate = useNavigate();
    const {ranklistId} = useParams();
    const [ranklist, setRanklist] = useState("");
    const [showEditDialog, setShowEditDialog] = useState(false);

    useEffect(() => {
        getRanklist(ranklistId, setRanklist);
    }, [])

    useEffect(() => {
        showEditDialog ? document.body.style.overflow = "hidden" : document.body.style.overflow = "scroll" 
    }, [showEditDialog])

    const openDialog = () => {
        setShowEditDialog(true);
    }

    const closeDialog = () => {
        setShowEditDialog(false)
    }  

    return (
        <div className="ranklist-page">
            <div className="back-btn-div">
                <BackButton handleClick={() => navigate(-1)}/>
            </div>

            <RankListImage id="ranklist-image" items={ranklist.items}/>
            
            <div className="ranklist-name">
                <h1 onClick={openDialog}>{ranklist.name}</h1>
            </div>
            
            
            <MoreButton> 
                <DropdownItem handleClick={openDialog} itemName="Edit details"/>
            </MoreButton>

            {showEditDialog 
            ? <EditDialog listName={ranklist.name} closeDialog={closeDialog} ranklistId={ranklistId}/>
            : null 
            }


            <div className="ranklist">
                {ranklist && ranklist.items.map((item, i) => {
                    return(
                        <ListItem key={i} index={i} item={item} removable={true} handleItemClick={() => ""}></ListItem>
                    )
                })}
            </div>
        </div>
    )
}

export default RankListPage