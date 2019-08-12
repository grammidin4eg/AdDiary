import firebase from 'firebase'
import user from './user';

export default {
    state: {
        items: [],
        year: new Date().getFullYear(),
        month: (new Date().getMonth() + 1)
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        },

        setSelectedDate(state, {year, month}) {
            state.year = year;
            state.month = month;
        }
    },
    getters: {
        items: (state) => state.items,
        itemsCount: (state) => state.items.length,
        year: (state) => state.year,
        month: (state) => state.month,
    },
    actions: {
        setSelectedDate({commit}, value) {
            commit('setSelectedDate', value);
        },
        getItems({commit, getters}) {
            commit('clearError');
            const userId = getters.userId + '';
            const curYear = getters.year;
            const curMonth = getters.month;
            if (userId && curYear && curMonth) {
                firebase.firestore().collection('diary')
                .where("user", "==", userId).where("year", "==", curYear).where("month", "==", curMonth)
                .get().then((snapshot) => {
                    console.log(snapshot, snapshot.size);
                    let ladderArray = [];
                    snapshot.forEach((doc) => {
                        ladderArray.push(doc.data().value);
                    });
                    console.log('RES!!!!!!', ladderArray);
                    commit('setItems', ladderArray);
                }).catch(error => commit('setError', error));
            }
        }
    }
}