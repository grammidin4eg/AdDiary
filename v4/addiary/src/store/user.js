import firebase from 'firebase'

export default {
   state: {
      isAuth: false,
      id: null,
      userName: '',
      profile: {}
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
         state.userName = '';
      },

      setProfile(state, value) {
         state.profile = value;
      }
   },
   getters: {
      isAuth: (state) => state.isAuth,
      userId: (state) => state.id,
      userName: (state) => state.userName,
      userProfile: (state) => state.profile,
   },
   actions: {
      registration({commit}, {login, password}) {
         commit('clearError');
         firebase.auth().createUserWithEmailAndPassword(login, password)
            .then(() => {
               firebase.auth().currentUser.sendEmailVerification();
            })
            .catch(function(error) {
               commit('setError', error);
            });
      },

      login({commit}, {login, password}) {
         commit('clearError');
         firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
            .then(() => {
               firebase.auth().signInWithEmailAndPassword(login, password)
                  .then(() => {
                  })
                  .catch(function(error) {
                     commit('setError', error);
                  });
            }).catch((error) => {
            commit('setError', error);
         });
      },

      recover({commit}, mail) {
         commit('clearError');
         commit('clearEvent');
         if (mail) {
            firebase.auth().sendPasswordResetEmail(mail)
               .then(() => {
                  commit('setEvent', 'recover-done');
               })
               .catch(function(error) {
                  commit('setError', error);
               });
         }
      },

      stateChange({commit, dispatch}, user) {
         //console.log('stateChange', user);
         if (user && user.uid) {
            commit('setUser', user);
            dispatch('getItems');
         } else {
            commit('clearUser');
         }
      },

      clearUser({commit}) {
         commit('clearUser');
         firebase.auth().signOut();
      },

      setUserProfile({commit, getters}, value) {
         if (value) {
            commit('setProfile', value);
            commit('clearError');
            const userId = getters.userId + '';
            if (userId) {
               firebase.firestore().collection('profile').doc(userId)
                  .set(value).catch(error => commit('setError', error));
            }
         }
      },

      getUserProfile({commit, getters}) {
         commit('clearError');
         const userId = getters.userId + '';
         if (userId) {
            firebase.firestore().collection('profile').doc(userId)
               .get().then((doc) => {
               if (doc.exists) {
                  commit('setProfile', doc.data())
               }
            }).catch(error => commit('setError', error));
         }
      }
   }
}