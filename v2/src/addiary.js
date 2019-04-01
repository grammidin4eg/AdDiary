import UserService from './user-service';

const APP_STATE = {
    LANDING: 0,
    REGISTRATION_FORM: 1,
    LOGIN_FORM: 2,
    TABLE: 3
};

const userService = new UserService();

new Vue({
    el: '#app',
    data: {
        curState: APP_STATE.LANDING,
        regEmail: '',
        regAge: '',
        regPassword: ''
    },
    methods: {
        openRegistrationForm() {
            this.curState = APP_STATE.REGISTRATION_FORM;
        },

        regFormConfirm() {
            console.log('confirm', this.regEmail, this.regPassword, this.regAge);
            userService.register(this.regEmail, this.regPassword, this.regAge).then(result => {
                console.log('result', result);
            }, error => {
                console.log('error', error);
            });
        }
    },

    computed: {
        showRegistrationForm() {            
            return (this.curState === APP_STATE.REGISTRATION_FORM);
        },

        showLanding() {
            return (this.curState === APP_STATE.LANDING);
        },

        diabledRegSubmit() {            
            return !(this.formRegEmail && this.formRegAge && this.regPassword);
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