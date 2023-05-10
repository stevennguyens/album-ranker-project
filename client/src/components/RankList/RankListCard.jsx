import { Link, useNavigate } from "react-router-dom"
import "./RankListCard.scss"
import RankListImage from "./RankListImage"

const RankList = ({item}) => {
    return(
        <Link 
            className="ranklist-card"
            to={`/ranklists/${item._id}`}
            state={item}>
            <div>
                <RankListImage items={item.items}/>
                <h4>{item.name}</h4>
            </div>
        </Link>
    )
}
export default RankList