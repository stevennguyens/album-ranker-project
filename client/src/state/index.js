import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    user: null,
    token: null,
    rankLists: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLogin: (state, action) => {
             state.user = action.payload.user;
             state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setRankLists: (state, action) => {
            if (state.user) {
                state.user.rankLists = action.payload.rankLists
            } else {
                console.log("User does not exist.");
            }
        },
        setRankList: (state, action) => {
            const updatedRankLists = state.rankLists.map((rankList) => {
                if (rankList._id === action.payload.rankList_id) {
                    return action.payload.rankList;
                } 
                return action.payload.rankList;
            });
            state.rankLists = updatedRankLists;
        }
    }
});

export const {setLogin, setLogout, setRankLists, setRankList} = authSlice.actions;
export default authSlice.reducer; 