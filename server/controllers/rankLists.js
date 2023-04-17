import RankList from "../models/RankList.js";

// create
export const createRankList = async (req, res) => {
    try {
        const {
            userId,
            title,
            ranklist
        } = req.body;
        const newRankList = new RankList(userId, title, ranklist);
        await newRankList.save();

        const rankList = await RankList.find()
        res.status(201).json(rankList)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}

// read
export const getRankList = async (req, res) => {
    try {
        const { id } = req.params;
        const rankList = RankList.findById(id);
        res.status(200).json(rankList);
    } catch (err) {
        res.status(404).json({ error:err.message });
    }
}

export const getUserRankLists = async (req, res) => {
    try {
        const { userId } = req.params;
        const rankLists = await RankList.find({userId});
        res.status(200).json(rankLists);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

// update

// delete