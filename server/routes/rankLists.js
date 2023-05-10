import express from "express";
import {
    createRankList,
    getRankList,
    getUserRankLists,
    updateRanklist
} from "../controllers/rankLists.js"
const router = express.Router();

// create rank list
router.post("/add-ranklist", createRankList);

// read ranklist 
router.get("/ranklist/:ranklistId", getRankList);
// read all ranklist of a user
router.get("/:userId", getUserRankLists);

// update ranklist
router.post("/ranklist/:ranklistId", updateRanklist);


export default router