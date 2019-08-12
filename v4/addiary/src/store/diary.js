import firebase from 'firebase'
import user from './user';

export default {
    state: {
        items: []
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        }
    },
    getters: {
        items: (state) => state.items,
        itemsCount: (state) => state.items.length,
    },
    actions: {
        getItems({commit, getters}) {
            commit('clearError');
            const userId = getters.userId + '';
            console.log('userId', userId);
            if (userId) {
                firebase.firestore().collection('diary')
                .where("user", "==", userId).where("year", "==", 2019).where("month", "==", 8)
                .get().then((snapshot) => {
                    console.log(snapshot, snapshot.size);
                    let ladderArray = [];
                    snapshot.forEach((doc) => {
                        let _data = doc.data();
                        delete _data.user;
                        ladderArray.push(_data);
                    });
                    console.log('RES!!!!!!', ladderArray);
                    commit('setItems', ladderArray);
                }).catch(error => commit('setError', error));
            }
        }
    }
}