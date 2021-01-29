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
    firebase.googleProvider = new firebase.auth.GoogleAuthProvider();

}

const FirebaseContext = React.createContext({});

export const Firebase = ({children}) => {
    const showError = useContext(ErrorPanelContext);
    let history = useHistory();
    const [user, setUser] = useState(firebase.auth().currentUser || null);

    function isAuth() {
        console.log('isAuth', !!firebase.auth().currentUser);
        return !!firebase.auth().currentUser;
    }

    /**
     * Авторизация с помощью firebase
     * @param email {string} почта
     * @param password {string} пароль
     */
    function auth(email, password) {
        console.log('auth', email, password);
        if (!email || !password) {
            return;
        }
        //https://firebase.google.com/docs/auth/web/start?authuser=0
        showError('');
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                history.push("/diary");
            })
            .catch(showError);
    }

    /**
     * Регистрация с помощью firebase
     * @param email {string} почта
     * @param password {string} пароль
     */
    function registration(email, password) {
        if (!email || !password) {
            return;
        }
        showError('');
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                setUser(userCredential.user);
                history.push("/diary");
            })
            .catch(showError);
    }

    /**
     * Войти с помощью google аккаунта
     */
    function signInWithGoogle() {
        firebase.auth()
            .signInWithPopup(firebase.googleProvider)
            .then((result) => {
                if (result.user) {
                    setUser(result.user);
                    history.push("/diary");
                }
            }).catch(showError);
    }

    /**
     * Восстановить пароль
     * @param emailAddress {string} почта
     * @param callback {func} функция, которая вызывается после отправки письма
     */
    function restore(emailAddress, callback) {
        firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
            if (callback) {
                callback(emailAddress);
            }
        }).catch(showError);
    }

    useEffect(() => {
        firebase.auth().onAuthStateChanged((newUser) => {
            console.log('onAuthStateChanged', newUser);
            setUser(newUser);
        });
    }, []);
    return (
        <FirebaseContext.Provider value={{isAuth, auth, registration, signInWithGoogle, restore, user}}>
            {children}
        </FirebaseContext.Provider>
    );
};

/**
 * хук использования функций firebase
 * @returns {{isAuth, auth, registration, signInWithGoogle, restore, user}} объект с публичными методами и объектами firebase
 */
export const useFirebase = () => {
    const context = useContext(FirebaseContext);
    return context;
}