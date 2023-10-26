import React from "react";

const NoteCard = ({ title, note }) => {

    return (
        <div className="NoteCard border mt-4 m-2 rounded-lg h-10 justify-center items-center cursor-pointer flex relative">
            <h1 className="left-0 absolute ml-2 font-bold">{title}</h1>
            <p className="text-sm">{note}</p>
        </div>
    )

}

export default NoteCard;