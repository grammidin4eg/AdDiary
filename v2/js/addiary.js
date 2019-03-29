const APP_STATE = {
    LANDING: 0,
    REGISTRATION_FORM: 1,
    LOGIN_FORM: 2,
    TABLE: 3
};

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
            return !(this.formRegEmail && this.regAge && this.regPassword);
        },

        formRegEmail() {
            return !!this.regEmail ? 'is-valid' : ''; //is-invalid
        }
    }
});