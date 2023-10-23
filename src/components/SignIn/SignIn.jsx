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

    return (
        <div className="SignIn">
            <button className="SignInButton pl-1 pr-1 rounded-md" onClick={signIn}>Sign Into <FontAwesomeIcon icon={faXTwitter} className="SignInIcon" /></button>
        </div>
    );
}

export default SignIn;