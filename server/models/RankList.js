import mongoose from "mongoose";

const RankListSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    name: {
        type: String
    },
    public: {
        type: Boolean
    },
    description: {
        type: String,
    },
    items: {
        type: Array,
    },
    type: {
        type: String,
        enum: ['artist', 'album', 'track']
    }
})

const RankList = mongoose.model("RankList", RankListSchema);

export default RankList;