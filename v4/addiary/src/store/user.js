import firebase from 'firebase'
import {getErrorText} from './error-code'

export default {
    state: {
        isAuth: false,
        id: null
    },
    mutations: {
        setUser(state, uid) {
            state.id = uid;
            state.isAuth = true;
        }
    },
    getters: {
        isAuth: (state) => state.isAuth,
        userId: (state) => state.id,
    },
    actions: {
        registration({commit, getters}, {login, password}) {
            commit('setError', null);
            firebase.auth().createUserWithEmailAndPassword(login, password)
            .then(res => {
                commit('setUser', res.user.uid);
            })
            .catch(function(error) {
                commit('setError', getErrorText(error, getters.lang));
                console.error('registration', error);
            });
        },

        login({commit, getters}, {login, password}) {
            commit('setError', null);
            firebase.auth().signInWithEmailAndPassword(login, password)
            .then(res => {
                commit('setUser', res.user.uid);
            })
            .catch(function(error) {
                commit('setError', getErrorText(error, getters.lang));
                console.error('login', error);
            });
        }
    }
}