import { getUserId } from "spotify";

const SERVER_URL = process.env.SERVER_URL
// read
export const getRanklist = async (ranklistId, setRanklist) => {
    const response = await fetch(`${SERVER_URL}/ranklists/ranklist/${ranklistId}`);
    const data = await response.json();
    if (data) setRanklist(data)
}

export const getRanklists = async (setRankLists) => {
    const userId = await getUserId();
    const response = await fetch(
        `${SERVER_URL}/ranklists/${userId}`
    );
    const data = await response.json();
    if (data) {
        setRankLists(data.rankLists)
    }
}

// delete
export const deleteRanklist = async (ranklistId) => {
    const userId = await getUserId(); 
    const response = await fetch(
        `${SERVER_URL}/ranklists/${userId}/delete-ranklist/${ranklistId}`,
        {
            method: "DELETE"
        }
        )
    const data = await response.json();
    return data.deletedCount
    
}
