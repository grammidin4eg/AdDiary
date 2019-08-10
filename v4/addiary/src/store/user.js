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
        registration({commit}, {login, password}) {
            commit('setError', null);
            firebase.auth().createUserWithEmailAndPassword(login, password)
            .then(res => {
                //commit('setUser', res.user.uid);
            })
            .catch(function(error) {
                commit('setError', error);
            });
        },

        login({commit}, {login, password}) {
            commit('setError', null);
            firebase.auth().signInWithEmailAndPassword(login, password)
            .then(res => {
                //commit('setUser', res.user.uid);
            })
            .catch(function(error) {
                commit('setError', error);
            });
        },

        stateChange({commit}, user) {
            if (user && user.uid) {
                commit('setUser', user.uid);
            } else {
                commit('clearUser');
            }
        }
    }
}