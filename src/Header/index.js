import React, { useEffect, useState } from 'react';
import blackLogo from '../assets/images/blackLogo.jpg';
import darkLogo from '../assets/images/darkLogo.png';
import lightLogo from '../assets/images/lightLogo.png';
import './index.css';

const Header = ({ theme, setTheme }) => {


    const [logo, setLogo] = useState();

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


    return (
        <div className="Header">
            <header className="App-header">
                <div className="flex items-center">
                    <p className="text-2xl text-center flex-grow mt-3">X Notes</p>
                </div>
                <div className="logo w-10 absolute m-2 cursor-pointer">
                    <img src={logo} className={`App-logo-${theme} rounded-lg`} alt="logo" onMouseEnter={highlightLogo} onMouseLeave={unhighlightLogo} onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')} />
                </div>
            </header>
        </div>
    );
}

export default Header;