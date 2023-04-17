import mongoose from "mongoose";

const RankListSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    title: {
        type: String
    },
    ranklist: {
        type: Array
    },
    picture: {
        type: String,
        default: ""
    },
    type: {
        type: String,
        enum: ['artist', 'album', 'track']
    }
})

const RankList = mongoose.model("RankList", RankListSchema);

export default RankList;