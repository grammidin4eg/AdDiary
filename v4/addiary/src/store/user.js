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
        registration({commit}, {email, password}) {
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                console.log('user', res);
                commit('setUser', res.user.uid);
            })
            .catch(function(error) {
                commit('setError', error.message);
                console.error(error);
            });
        }
    }
}