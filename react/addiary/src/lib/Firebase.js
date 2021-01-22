import React, {useContext} from 'react';
import firebase from 'firebase';

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

function isAuth() {
    return !!firebase.auth().getUid();
}

function auth(email, password) {
    //https://firebase.google.com/docs/auth/web/start?authuser=0
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log('user', user);
            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.error('error', error);
        });
}

export const Firebase = ({children}) => {
    return (
        <FirebaseContext.Provider value={{isAuth}}>
            {children}
        </FirebaseContext.Provider>
    );
};


export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    return context;
}