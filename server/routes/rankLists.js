import express from "express";
import {
    createRankList,
    getRankList,
    getUserRankLists
} from "../controllers/rankLists.js"
const router = express.Router();
router.get("/:userId/:rankListId", getRankList);
router.get("/:userId", getUserRankLists);

// create rank list
router.post("/add-ranklist", createRankList);
export default router