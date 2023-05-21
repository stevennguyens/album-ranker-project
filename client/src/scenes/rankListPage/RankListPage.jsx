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
import RankListForm from "./RankListForm";
import { getUserId } from "spotify";
import { deleteRanklist } from "server";
const RankListPage = () => {
    const navigate = useNavigate();
    const {ranklistId} = useParams();
    const [ranklist, setRanklist] = useState("");
    const [edit, setEdit] = useState(false);
    const [userId, setUserId] = useState();

    useEffect(() => {
        getRanklist(ranklistId, setRanklist);
    }, []);
    useEffect(() => {
        const fetchUserId = async () => {
            setUserId(await getUserId());
        }
        fetchUserId()
    }, []);

    const saveRanklist = async ({name, items}) => {
        if (name) {
            const response = await fetch(`${process.env.SERVER_URL}/ranklists/ranklist/${ranklistId}`,
                {
                    method: "POST",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({name: name, items: items})
                }
            );
            const data = await response.json();
            if (data) setEdit(false);
        }
    }

    const handleDelete = () => {
        const deleted = deleteRanklist(ranklistId);
        console.log()
        if (deleted) {
            navigate("/home");
        } else {
            // add dialog that user cannot delete 
        }
    }
    return (
        ranklist && 
        <RankListForm name={ranklist.name} ranklist={ranklist.items} type={ranklist.type} buttonText="Save" edit={edit} handleClick={saveRanklist}>
            { 
                ranklist.userId === userId &&
                (<MoreButton> 
                    <DropdownItem handleClick={()=>setEdit(true)} itemName="Edit details"/>
                    <DropdownItem red={"red"} handleClick={handleDelete} itemName="Delete ranklist"/>
                </MoreButton>)
                
            }
        </RankListForm>
    )
}

export default RankListPage