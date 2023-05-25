import { useLocation, useNavigate, useParams } from "react-router-dom";
import RankListForm from "./RankListForm";
import "./RankListPage.scss";
import { getUserId } from "spotify";
import { SERVER_URL } from "constants";
const AddRankListPage = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    let { type } = useParams();
    type = type.substring(0, type.length - 1);
  
    const createRanklist = async ({name, items}) => {
        const userId = await getUserId();
        const response = await fetch (
            `${SERVER_URL}/ranklists/add-ranklist`,
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({userId:userId, name:name, items:items, type:type})
            }
        );
        const data = await response.json();
        if (data) {
            navigate("/home");
        }
    }

    return (
        <RankListForm name={`Ranklist #${state.size + 1}`} ranklist={[]} type={type} buttonText="Add ranklist" handleClick={createRanklist} edit={true}/>
    )
}

export default AddRankListPage