import UserService from './user-service';
import AdDiaryService from './addiary-service';

const APP_STATE = {
    LANDING: 0,
    REGISTRATION_FORM: 1,
    LOGIN_FORM: 2,
    TABLE: 3
};

const userService = new UserService();
const adDiaryService = new AdDiaryService();

new Vue({
    el: '#app',
    data: {
        curState: APP_STATE.LANDING,
        regEmail: '',
        regAge: '',
        regPassword: '',
        regError: '',
        userObj: null,
    },
    methods: {
        clearForm() {
            this.regEmail = '';
            this.regAge = '';
            this.regPassword = '';
            this.regError = '';
        },

        openRegistrationForm() {
            this.clearForm();
            this.curState = APP_STATE.REGISTRATION_FORM;
        },

        openLoginForm() {
            this.clearForm();
            this.curState = APP_STATE.LOGIN_FORM;
        },

        showError(error) {
            console.log('error', error);
            this.regError = error;
        },

        login(_userObj) {
            console.log('result user', _userObj);
            this.regError = '';
            if (_userObj.id) {
                userService.saveLocal(_userObj);
                this.userObj = _userObj;
                this.loadTable();
            }
        },

        regFormConfirm() {       
            if (this.isLoginForm) {
                userService.login(this.regEmail, this.regPassword).then(this.login, this.showError);
            } else {
                userService.register(this.regEmail, this.regPassword, this.regAge).then(this.login, this.showError);
            }            
        },

        regFormCancel() {
            this.curState = APP_STATE.LANDING;
        },

        loadTable() {
            adDiaryService.list(this.userObj.id).then(result => {
                console.log('result list', result);
                this.curState = APP_STATE.TABLE;
            }, this.showError);
        }
    },

    computed: {
        showRegistrationForm() {            
            return ((this.curState === APP_STATE.REGISTRATION_FORM) || (this.curState === APP_STATE.LOGIN_FORM));
        },

        isLoginForm() {            
            return (this.curState === APP_STATE.LOGIN_FORM);
        },

        showLanding() {
            return (this.curState === APP_STATE.LANDING);
        },

        showTable() {
            return (this.curState === APP_STATE.TABLE);
        },

        disabledRegSubmit() {            
            return !(this.formRegEmail && (this.formRegAge || (this.curState === APP_STATE.LOGIN_FORM)) && this.regPassword);
        },

        formRegEmail() {
            return !!this.regEmail ? 'is-valid' : ''; //is-invalid
        },

        formRegAge() {
            if (!this.regAge) {
                return '';
            }
            var val = parseInt(this.regAge);            
            return (val && !Number.isNaN(val) && (val > 0) && (val < 200) ) ? 'is-valid' : ''; //is-invalid
        },

        formRegPassword() {
            return (!!this.regPassword) && (this.regPassword.length > 4) ? 'is-valid' : '';
        }
    }
});