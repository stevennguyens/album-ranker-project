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
        const { ranklistId } = req.params;
        const ranklist = await RankList.findById(ranklistId);
        res.status(200).json(ranklist);
    } catch (err) {
        res.status(404).json({ error:err.message });
    }
}

export const getUserRankLists = async (req, res) => {
    try {
        const { userId } = req.params;
        const rankLists = await RankList.find({userId: userId});
        res.status(200).json({rankLists});
    } catch (err) {
        res.status(404).json({error: err.message});
    }
}

// update
export const updateRanklist = async (req, res) => {
    try {
        const { ranklistId } = req.params;
        const { name } = req.body
        const doc = await RankList.findOneAndUpdate({_id: ranklistId}, {name: name}, {new: true});
        res.status(200).json(doc.name)
    } catch (err) {
        res.status(404).json({error: err.message})
    }
}
// delete