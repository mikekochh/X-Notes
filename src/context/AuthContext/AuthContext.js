import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const AuthContext = React.createContext(null);
const auth = getAuth();

export const AuthContextProvider = (props) => {

    const [user, setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setUser(user);
        })
    }, []);
    
    return(
        <AuthContext.Provider value={user}>
            {props.children}
        </AuthContext.Provider>
    )
}