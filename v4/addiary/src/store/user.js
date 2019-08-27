import firebase from 'firebase'

export default {
    state: {
        isAuth: false,
        id: null
    },
    mutations: {
        setUser(state, uid) {
            state.id = uid;
            state.isAuth = true;
        },
        clearUser(state) {
            state.id = null;
            state.isAuth = false;
        }
    },
    getters: {
        isAuth: (state) => state.isAuth,
        userId: (state) => state.id,
    },
    actions: {
        registration({ commit }, { login, password }) {
            commit('clearError');
            firebase.auth().createUserWithEmailAndPassword(login, password)
                .then(res => {
                    //commit('setUser', res.user.uid);
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
                    //commit('setUser', res.user.uid);
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
                commit('setUser', user.uid);
                dispatch('getItems');
            } else {
                commit('clearUser');
            }
        }
    }
}