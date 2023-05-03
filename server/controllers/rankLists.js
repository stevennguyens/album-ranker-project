import RankList from "../models/RankList.js";

// create
export const createRankList = async (req, res) => {
    console.log("create rank list")
    try {
        const {
            userId,
            name,
            items,
            type
        } = req.body;
        
        if (userId && name && items.length && type) {
            const newRankList = new RankList({items: items, userId: userId, name: name, public: true, description: "", type: type});
            await newRankList.save();

            const rankList = await RankList.find()
            res.status(201).json(rankList)
        } else {
            res.status(404).json({error: "params undefined"})
        }
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