import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './AddNewNote.css';
import { BaseContext } from "../../context/Firebase/BaseContext";    

const AddNewNoteInput = ({ setNewNoteScreenVisible }) => {

    const theme = localStorage.getItem('theme');
    const firebase = useContext(BaseContext);
    const ref = firebase.getFirestore();

    const saveNewNote = () => {
        const newNoteTitle = document.getElementById("newNoteTitle").value;
        const newNoteContent = document.getElementById("newNoteContent").value;
        const userID = firebase.getUserID();
        console.log('userID: ', userID);
        const documentContent = {title: newNoteTitle, content: newNoteContent, userID: userID};
        firebase.addNewDocument(ref, 'notes', documentContent);
        setNewNoteScreenVisible(false);
    }

    return (
        <div className="AddNewNoteInput">
            <h1>Add New Note</h1>
            Note Name: <input type="text" id="newNoteTitle" placeholder="Title" className="AddNewNoteTitleInput text-black" /><br/><br />
            Note Content: <textarea placeholder="Content" id="newNoteContent" className="AddNewNoteContentInput text-black" />
            <div className={`SaveNewNote-${theme}`} onClick={saveNewNote}>
                <button className="SaveNewNoteButton" onClick={saveNewNote}>Save</button>
            </div>
        </div>
    )
}


const AddNewNote = () => {

    const theme = localStorage.getItem('theme');
    const [newNoteScreenVisible, setNewNoteScreenVisible] = useState(false);

    const addNewNote = () => {
        if (newNoteScreenVisible) {
            return;
        }
        console.log('Add New Note');
        setNewNoteScreenVisible(true);
    }


    const highlightButton = () => {
        document.querySelector(`.AddNewNote-${theme}`).classList.add(`AddNewNote-${theme}-hover`);
        document.querySelector(`.PlusButton-${theme}`).classList.add(`PlusButton-${theme}-hover`);
    }

    const unhighlightButton = () => {
        document.querySelector(`.AddNewNote-${theme}`).classList.remove(`AddNewNote-${theme}-hover`);
        document.querySelector(`.PlusButton-${theme}`).classList.remove(`PlusButton-${theme}-hover`);
    }


    return (
        <div className={`AddNewNote-${theme} m-2 mt-4 rounded-2xl flex justify-center items-center cursor-pointer`} onClick={addNewNote} onMouseEnter={highlightButton} onMouseLeave={unhighlightButton}>
            {/* <div className={`AddNewNote-${theme} m-2 mt-4 rounded-2xl flex justify-center items-center cursor-pointer`} onMouseEnter={highlightButton} onMouseLeave={unhighlightButton}> */}
            <FontAwesomeIcon icon={faPlus} className={`text-2xl PlusButton-${theme} w-4 h-4 rounded-2xl p-1 m-2 mr-3`} />
            <p>Add New Note</p>
            {newNoteScreenVisible ? <div className="NewNoteScreen"><AddNewNoteInput setNewNoteScreenVisible={setNewNoteScreenVisible} /></div> : ""}
        </div>
    );
}

export default AddNewNote;