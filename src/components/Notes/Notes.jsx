import React, { useState, useEffect, useContext } from "react";
import AddNewNote from "../AddNewNote/AddNewNote";
import { BaseContext } from "../../context/Firebase/BaseContext";
import NoteCard from "../NoteCard/NoteCard";

const Notes = () => {

    const firebase = useContext(BaseContext);
    const ref = firebase.getFirestore();

    const [notes, setNotes] = useState([]);

    const [displayName, setDisplayName] = useState(null);

    useEffect(() => {
        async function fetchNotes() {
            try {
                const notesData = await firebase.getCollection(ref, 'notes');
                setNotes(notesData);
            } catch (error) {
                console.log('error: ', error);
            }
        }

        async function fetchDisplayName() {
            try {
                const displayName = await firebase.getDisplayName();
                setDisplayName(displayName);
            } catch (error) {
                console.log('error: ', error);
            }
        }

        fetchNotes();
        fetchDisplayName();
    }, [firebase, ref]);

    return (
        <div>
            <div>
                <h1>{displayName}'s Notes</h1>
            </div>
            <div className="Notes">
                {notes.length ? notes.map((note) => (
                    <NoteCard key={note.noteID} note={note.note} title={note.title} />
                )) : null}
            </div>
            <AddNewNote />
        </div>


    )

}

export default Notes;
