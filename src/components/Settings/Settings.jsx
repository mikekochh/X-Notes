import React from "react";
import "./Settings.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { BaseContext } from '../../context/Firebase/BaseContext';

const Settings = ({ theme, setTheme }) => {

    const firebase = useContext(BaseContext);

    let isUserSignedIn;

    const checkUserSignIn = async () => {
        isUserSignedIn = await firebase.isUserSignedIn();
    }

    checkUserSignIn();

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    }

    async function signOut () {
        await firebase.signUserOut();
    }

    return (
        <div className="SettingsToolBar bottom-0 absolute text-white flex justify-between">
            <div className="flex ml-1 mt-2 mb-4 pt-4">
                <input type="checkbox" className="checkbox" id="checkbox" onChange={changeTheme} />
                <label htmlFor="checkbox" className="flexBetween w-16 h-8 bg-black rounded-2xl p-1 relative label cursor-pointer">
                <div className="toggle">
                    <FontAwesomeIcon icon={faSun} className="fa-sun" />
                    <FontAwesomeIcon icon={faMoon} className="fa-moon" />
                </div>
                <div className="w-6 h-6 absolute bg-white rounded-full ball" />
                </label>
            </div>
            <div className="mr-2 mt-2 mb-4 pt-4">
                {true ? <button className={`SignOutButton-${theme} p-1 pl-2 pr-2 rounded-md`} onClick={signOut}>Sign Out</button> : ""}
            </div>
        </div>
    );
}

export default Settings;
