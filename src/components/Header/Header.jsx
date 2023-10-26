import React, { useEffect, useState } from 'react';
import darkLogo from '../../assets/images/darkLogo.png';
import lightLogo from '../../assets/images/lightLogo.png';
import './Header.css';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext';
import { BaseContext } from '../../context/Firebase/BaseContext';

const Header = ({ theme, setTheme }) => {

    const user = useContext(AuthContext);
    const firebase = useContext(BaseContext);

    const userPhoto = user ? user.photoURL : '';

    const [logo, setLogo] = useState();

    if (localStorage.getItem('theme')) {
        setTheme(localStorage.getItem('theme'));
    }
    else {
        setTheme('dark');
        localStorage.setItem('theme', 'dark');
    }

    useEffect(() => {
        if (theme === 'dark') {
            setLogo(darkLogo);
        }
        else {
            setLogo(lightLogo);
        }
    }, [theme]);

    const highlightLogo = () => {
        if (theme === 'dark') {
            setLogo(lightLogo);
        } else {
            setLogo(darkLogo);
        }
    }

    const unhighlightLogo = () => {
        if (theme === 'light') {
            setLogo(lightLogo);
        }
        else {
            setLogo(darkLogo);
        }
    }

    const changeTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        localStorage.setItem('theme', theme === 'light' ? 'dark' : 'light');
    }

    async function signOut () {
        await firebase.signUserOut();
    }

    return (
        <div className="Header relative mb-3">
            <header className={`App-header-${theme}`}>
                <div className="flex items-center">
                    <p className="text-2xl text-center flex-grow mt-3">X Notes</p>
                </div>
                <div className="logo w-10 absolute m-2 cursor-pointer">
                    <img src={logo} className={`App-logo-${theme} rounded-lg`} alt="logo" onMouseEnter={highlightLogo} onMouseLeave={unhighlightLogo} onClick={() => changeTheme()} />
                </div>
                <div className="right-0 m-2 absolute top-0">
                    {user ? <img src={`${userPhoto}`} className="profilePic w-10 h-10 rounded-full cursor-pointer" alt="profile pic" onClick={signOut} /> : ""}
                </div>
            </header>
        </div>
    );
}

export default Header;