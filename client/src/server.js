import { getUserId } from "spotify";

// read
export const getRanklist = async (ranklistId, setRanklist) => {
    const response = await fetch(`http://localhost:3001/ranklists/ranklist/${ranklistId}`);
    const data = await response.json();
    if (data) setRanklist(data)
}

export const getRanklists = async (setRankLists) => {
    const userId = await getUserId();
    const response = await fetch(
        `http://localhost:3001/ranklists/${userId}`
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
        `http://localhost:3001/ranklists/${userId}/delete-ranklist/${ranklistId}`,
        {
            method: "DELETE"
        }
        )
    const data = await response.json();
    return data.deletedCount
    
}
