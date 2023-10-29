import React, { useState, useEffect, useContext } from "react";
import AddNewNote from "../AddNewNote/AddNewNote";
import { BaseContext } from "../../context/Firebase/BaseContext";
import NoteCard from "../NoteCard/NoteCard";
import "./Notes.css";

const Notes = () => {

    const firebase = useContext(BaseContext);
    const ref = firebase.getFirestore();

    const [notes, setNotes] = useState([]);

    const [displayName, setDisplayName] = useState(null);

    const deleteNote = (noteID) => {
        const updatedNotes = notes.filter((note) => note.noteID !== noteID);
        setNotes(updatedNotes);
    }

    const addNote = (note) => {
        const updatedNotes = [...notes, note];
        setNotes(updatedNotes);
    }

    useEffect(() => {
        async function fetchNotes() {
            try {
                const notesData = await firebase.getCollection(ref, 'notes');
                if (notesData) {
                    setNotes(notesData);
                }
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
        <div className="MainPage">
            <div>
                <h1>{displayName}'s Notes</h1>
            </div>
            <div className="NotesContainer">
                <div className="Notes">
                    {notes.length ? notes.map((note) => (
                        <NoteCard 
                            note={note.noteContent} 
                            title={note.noteTitle} 
                            noteID={note.noteID}
                            onDelete={deleteNote} />
                    )) : null}
                </div>
            </div>
            <AddNewNote addNote={addNote} />
        </div>
    )

}

export default Notes;
