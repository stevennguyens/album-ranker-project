import express from "express";
import {
    getUser,
    getRankLists
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();
// read
router.get("/:id", verifyToken, getUser);
router.get("/:id/ranklists", verifyToken, getRankLists);

export default router