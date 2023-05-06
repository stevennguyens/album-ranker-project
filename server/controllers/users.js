import User from "../models/User.js";
import RankList from "../models/RankList.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

export const getRankLists = async (req, res) => {
    try {
        const { userId } = req.params;
        const rankLists = await Promise.all(
            RankList.find({userId: userId})
        )
        const formattedRankLists = rankLists.map(({_id, userId, title, rankList}) => {_id, userId, title, rankList})
        res.status(200).json(formattedRankLists);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}