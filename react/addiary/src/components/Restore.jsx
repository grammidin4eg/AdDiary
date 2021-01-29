import React, {useState} from 'react';
import {Field, reduxForm, change} from 'redux-form'
import {useFirebase} from "../lib/Firebase";
import { NavLink } from 'react-router-dom';

const LOCAL_STORAGE_KEY = 'ADDIARY_USER_EMAIL';

const Form = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className="my-5 col-sm-9 col-md-7 col-lg-5">
            <h1 className="h3 mb-3 font-weight-normal">Восстановление пароля</h1>
            <label htmlFor="inputEmail" className="sr-only">Почта</label>
            <div className="input-group">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">@</span>
                </div>
                <Field component="input" className="form-control" placeholder="Введите адрес почты" type="email"
                       name="inputEmail" id="inputEmail" required autoFocus/>
            </div>

            <button id="submit" className="btn btn-lg btn-primary btn-block mt-1" type="submit">Восстановить пароль</button>
            <hr className="my-4"/>
            <div>
                <NavLink to={"/login"}  className="mt-1" type="button">Войти, используя существующий логин</NavLink>
            </div>
            <div>
                <NavLink to={"/reg"}  className="mt-1" type="button">Еще не зарегистрирован</NavLink>
            </div>
        </form>
    );
}

const RestoreForm = reduxForm({
    form: 'RestoreForm'
})(Form)

const Restore = () => {
    const {restore} = useFirebase();
    const [formVisible, setFormVisible] = useState(true);
    const handleSubmit = (res) => {
        if (res && res.inputEmail) {
            restore(res.inputEmail, () => {
                setFormVisible(false);
            });
        }
    }
    const sendedMsg = (<>
        <span>На указанную почту отправлено письмо.</span>
        <NavLink to={"/login"} className={"ml-1"}>Вернуться к окну входа.</NavLink>
        </>);
    return (
        <div className="container text-center d-flex justify-content-center align-items-center vh-100">
            {formVisible ? <RestoreForm onSubmit={handleSubmit}/> : sendedMsg}
        </div>
    );
}

export default Restore;