import React, { useContext } from "react";
import "./NoteCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenNib } from '@fortawesome/free-solid-svg-icons';
import { BaseContext } from "../../context/Firebase/BaseContext";


const NoteCard = ({ title, note, noteID, onDelete }) => {

    const firebase = useContext(BaseContext);
    const ref = firebase.getFirestore();

    const theme = localStorage.getItem('theme');

    async function deleteNote () {
        await firebase.deleteNote(ref, 'notes', noteID);
        onDelete(noteID);
    }

    const postTweet = () => {
        console.log('Post Tweet');
    }

    return (
        <div className={`NoteCard-${theme} mt-4 m-2 rounded-lg h-10 justify-center items-center cursor-pointer flex relative`}>
            <h1 className="left-0 absolute ml-2 font-bold">{title}</h1>
            <p className="text-sm">{note}</p>
            <FontAwesomeIcon icon={faPenNib} className="absolute right-0 mr-8 wiggle" onClick={postTweet} />
            <FontAwesomeIcon icon={faTrash} className="absolute right-0 mr-2 wiggle" onClick={deleteNote} />
        </div>
    )

}

export default NoteCard;