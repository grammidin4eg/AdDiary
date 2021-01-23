import React, {useContext, useEffect, useState} from 'react';
import firebase from 'firebase';
import {ErrorPanelContext} from "../components/ErrorPanel";
import { useHistory } from "react-router-dom";

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: "AIzaSyAz3kkR3M8B3hu499Z-oiBzzPckosywSek",
        authDomain: "addiary-f4f05.firebaseapp.com",
        databaseURL: "https://addiary-f4f05.firebaseio.com",
        projectId: "addiary-f4f05",
        storageBucket: "addiary-f4f05.appspot.com",
        messagingSenderId: "436974978522",
        appId: "1:436974978522:web:7ccc4ee7ccbd77a23c2ce3"
    });
}

console.log('firebase', firebase);

const FirebaseContext = React.createContext({});

export const Firebase = ({children}) => {
    const showError = useContext(ErrorPanelContext);
    let history = useHistory();
    const [user, setUser] = useState(null);

    function isAuth() {
        console.log('isAuth', !!firebase.auth().getUid(), firebase.auth().getUid(), firebase.auth());
        return !!firebase.auth().getUid();
    }

    function auth(email, password) {
        console.log('auth', email, password);
        if (!email || !password) {
            return;
        }
        //https://firebase.google.com/docs/auth/web/start?authuser=0
        showError('');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('user', user);
                history.push("/diary");
            })
            .catch(showError);
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged((newUser) => {
            console.log('onAuthStateChanged', newUser);
            setUser(newUser);
        });
    }, []);
    return (
        <FirebaseContext.Provider value={{isAuth, auth, user}}>
            {children}
        </FirebaseContext.Provider>
    );
};


export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    return context;
}