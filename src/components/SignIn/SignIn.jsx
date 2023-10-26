import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./SignIn.css";
import { faXTwitter } from '@fortawesome/free-brands-svg-icons';
import { useContext } from "react";
import { BaseContext } from "../../context/Firebase/BaseContext";

const SignIn = () => {

    const firebase = useContext(BaseContext);

    async function signIn () {
        await firebase.signUserIn();
    }

    const theme = localStorage.getItem('theme');

    return (
        <div className="SignIn">
            <button className={`SignInButton-${theme} p-1 pl-2 pr-2 rounded-md`} onClick={signIn}>Sign Into <FontAwesomeIcon icon={faXTwitter} className="SignInIcon" /></button>
        </div>
    );
}

export default SignIn;