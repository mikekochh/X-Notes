import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import './AddNewNote.css';


const AddNewNote = () => {

    const theme = localStorage.getItem('theme');

    console.log(theme);

    const addNewNote = () => {
        console.log('Add New Note');
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
            <FontAwesomeIcon icon={faPlus} className={`text-2xl PlusButton-${theme} w-4 h-4 rounded-2xl p-1 m-2 mr-3`} />
            <p>Add New Note</p>
        </div>
    );
}

export default AddNewNote;