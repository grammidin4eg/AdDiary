import React from 'react';
import {Field, reduxForm, change} from 'redux-form'
import {useFirebase} from "../lib/Firebase";
import { NavLink } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'ADDIARY_USER_EMAIL';

const Form = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className="my-5 col-sm-9 col-md-7 col-lg-5">
            <h1 className="h3 mb-3 font-weight-normal">Регистрация</h1>
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
            <button id="submit" className="btn btn-lg btn-primary btn-block mt-1" type="submit">Зарегистрироваться</button>
            <hr className="my-4"/>
            <div>
                <NavLink to={"/login"}  className="mt-1" type="button">Войти, используя существующий логин</NavLink>
            </div>
        </form>
    );
}

const RegistrationForm = reduxForm({
    form: 'RegistrationForm'
})(Form)

const Registration = () => {
    const {registration} = useFirebase();
    const handleSubmit = (res) => {
        console.log('reg', res);
        if (res && res.inputEmail && res.inputPassword) {
            registration(res.inputEmail, res.inputPassword);
            localStorage.setItem(LOCAL_STORAGE_KEY, res.inputEmail);
        }
    }
    return (
        <div className="container text-center d-flex justify-content-center align-items-center vh-100">
            <RegistrationForm onSubmit={handleSubmit}/>
        </div>
    );
}

export default Registration;