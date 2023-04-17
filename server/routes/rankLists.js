import express from "express";
import {
    getRankList
} from "../controllers/rankLists.js"
const router = express.Router();
router.get("/:userId/:rankListId", getRankList);
router.get("/:userId/ranklists", getRankList);
export default router