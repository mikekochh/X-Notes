import React from "react";
import AddNewNote from "../AddNewNote/AddNewNote";
import "./MainPage.css";
import SignIn from "../SignIn/SignIn";
import { useContext } from "react";
import { BaseContext } from "../../context/Firebase/BaseContext";
import { AuthContext } from "../../context/AuthContext/AuthContext";


const MainPage = () => {

    const user = useContext(AuthContext);

    console.log('user: ', user);

    return (
        <div>
            {user ? <AddNewNote /> : <SignIn />}
        </div>
    );
}

export default MainPage;