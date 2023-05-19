import Button from "components/Buttons/Button";
import "./EditDialog.scss";
import { useState } from 'react';
import { updateRanklist } from "server";
import Error from "components/Error/Error";

const EditDialog = ({listName, closeDialog, ranklistId}) => {
    const [name, setName] = useState(listName);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
        if (!e.target.value) {
            setError("Ranklist name is required.");
        } else {
            setError("");
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name) {
            setError("Ranklist name is required.");}
        // } else {
        //     saveRanklist(name, items)
        // }
    } 

    return (
        <div onClick={closeDialog} className="edit-dialog-div">
            <form method="post" onClick={(e) => e.stopPropagation()} className="edit-dialog-form">
                <span onClick={closeDialog} className="close-btn material-symbols-outlined">
                close
                </span>
                <label for="name">Name</label>
                <input onChange={(e) => handleChange(e)} className={error ? "input input-error" : "input"} name="name" type="text" value={name} aria-describedby="error"></input>
                { error 
                && 
                <Error error={error}/> }
                <Button handleClick={handleSubmit} text="Save" type="submit"/>
            </form>
        </div>
        
    )
}

export default EditDialog;