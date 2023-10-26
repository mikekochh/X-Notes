import React from "react";
import Notes from "../Notes/Notes";
import "./MainPage.css";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";


const MainPage = () => {

    const user = useContext(AuthContext);

    return (
        <div>
            {user ? <Notes /> : <SignIn />}
        </div>
    );
}

export default MainPage;