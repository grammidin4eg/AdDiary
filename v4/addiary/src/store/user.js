import firebase from 'firebase'

export default {
    state: {
        isAuth: false,
        id: null,
        userName: ''
    },
    mutations: {
        setUser(state, user) {
            state.id = user.uid;
            state.isAuth = true;
            state.userName = user.email;
        },
        clearUser(state) {
            state.id = null;
            state.isAuth = false;
        },
    },
    getters: {
        isAuth: (state) => state.isAuth,
        userId: (state) => state.id,
        userName: (state) => state.userName,
    },
    actions: {
        registration({ commit }, { login, password }) {
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(login, password)
                .then(res => {
                    firebase.auth().currentUser.sendEmailVerification();
                })
                .catch(function (error) {
                    commit('setError', error);
                });
        },

        login({ commit }, { login, password }) {
            commit('clearError');
            firebase.auth().signInWithEmailAndPassword(login, password)
                .then(res => {
                })
                .catch(function (error) {
                    commit('setError', error);
                });
        },

        recover({ commit }, mail) {
            commit('clearError');
            commit('clearEvent');
            if (mail) {
                firebase.auth().sendPasswordResetEmail(mail)
                    .then(res => {
                        commit('setEvent', 'recover-done');
                    })
                    .catch(function (error) {
                        commit('setError', error);
                    });
            }
        },

        stateChange({ commit, dispatch }, user) {
            if (user && user.uid) {
                commit('setUser', user);
                dispatch('getItems');
            } else {
                commit('clearUser');
            }
        }
    }
}