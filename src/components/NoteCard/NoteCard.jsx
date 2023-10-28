import React from "react";
import "./NoteCard.css";

const NoteCard = ({ title, note }) => {

    const theme = localStorage.getItem('theme');

    return (
        <div className={`NoteCard-${theme} mt-4 m-2 rounded-lg h-10 justify-center items-center cursor-pointer flex relative`}>
            <h1 className="left-0 absolute ml-2 font-bold">{title}</h1>
            <p className="text-sm">{note}</p>
        </div>
    )

}

export default NoteCard;