import express from "express";
import {
    createRankList,
    getRankList
} from "../controllers/rankLists.js"
const router = express.Router();
router.get("/:userId/:rankListId", getRankList);
router.get("/:userId/ranklists", getRankList);

// create rank list
router.post("/add-ranklist", createRankList);
export default router