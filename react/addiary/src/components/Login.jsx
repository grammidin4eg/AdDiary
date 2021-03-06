import React, {useEffect} from 'react';
import {Field, reduxForm, change} from 'redux-form'
import {useFirebase} from "../lib/Firebase";
import {useDispatch} from "react-redux";
import { NavLink } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'ADDIARY_USER_EMAIL';

const Form = ({handleSubmit, onGoogleSignIn}) => {
    const formDispatch = useDispatch();
    useEffect(() => {
        if (localStorage.hasOwnProperty(LOCAL_STORAGE_KEY)) {
            const emailSavedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (emailSavedValue) {
                formDispatch(change('LoginForm', 'inputEmail', emailSavedValue));
            }
        }
    }, []);
    return (
        <form onSubmit={handleSubmit} className="my-5 col-sm-9 col-md-7 col-lg-5">
            <h1 className="h3 mb-3 font-weight-normal">Вход</h1>
            <label htmlFor="inputEmail" className="sr-only">Почта</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <Field component="input" className="form-control" placeholder="Введите адрес почты" type="email"
                       name="inputEmail" id="inputEmail" required autoFocus/>
            </div>

            <label htmlFor="inputPassword" className="sr-only">Пароль</label>
            <Field component="input" className="form-control mt-1" placeholder="Пароль" type="password"
                   name="inputPassword" id="inputPassword" required/>
            <div className="invalid-feedback text-left">Введите пароль</div>
            <button id="submit" className="btn btn-lg btn-primary btn-block mt-1" type="submit">Войти</button>
            <hr className="my-4"/>
            <div>
                <NavLink to={"/restore"} className="mt-1" type="button">Я забыл пароль</NavLink>
            </div>
            <div>
                <NavLink to={"/reg"}  className="mt-1" type="button">Еще не зарегистрирован</NavLink>
            </div>
            <button onClick={onGoogleSignIn} id="openGoogle" className="btn btn-outline-success mt-2" type="button">Войти с помощью Google
            </button>
        </form>
    );
}

const LoginForm = reduxForm({
    form: 'LoginForm'
})(Form)

const Login = () => {
    const {auth, signInWithGoogle} = useFirebase()
    const handleSubmit = (res) => {
        console.log('res', res);
        if (res && res.inputEmail && res.inputPassword) {
            auth(res.inputEmail, res.inputPassword);
            localStorage.setItem(LOCAL_STORAGE_KEY, res.inputEmail);
        }
    }

    const handleGoogleSignIn = () => {
        signInWithGoogle();
    }
    return (
        <div className="container text-center d-flex justify-content-center align-items-center vh-100">
            <LoginForm onSubmit={handleSubmit} onGoogleSignIn={handleGoogleSignIn}/>
        </div>
    );
}

export default Login;