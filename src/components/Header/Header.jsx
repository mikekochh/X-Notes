import React, { useEffect, useState } from 'react';
import darkLogo from '../../assets/images/darkLogo.png';
import lightLogo from '../../assets/images/lightLogo.png';
import './Header.css';
import { useContext } from 'react';
import { BaseContext } from '../../context/Firebase/BaseContext';
import { AuthContext } from '../../context/AuthContext/AuthContext';

const Header = ({ theme, setTheme }) => {


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

    return (
        <div className="Header relative">
            <header className="App-header">
                <div className="flex items-center">
                    <p className="text-2xl text-center flex-grow mt-3">X Notes</p>
                </div>
                <div className="logo w-10 absolute m-2 cursor-pointer">
                    <img src={logo} className={`App-logo-${theme} rounded-lg`} alt="logo" onMouseEnter={highlightLogo} onMouseLeave={unhighlightLogo} onClick={() => changeTheme()} />
                </div>
                <div className="profilePic right-0 m-2">Hey</div>
            </header>
        </div>
    );
}

export default Header;