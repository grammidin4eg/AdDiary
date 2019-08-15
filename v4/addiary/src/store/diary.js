import firebase from 'firebase'

export default {
    state: {
        items: [],
        year: new Date().getFullYear(),
        month: (new Date().getMonth() + 1),
        diaryLoading: false
    },
    mutations: {
        setItems(state, items) {
            state.items = items;
        },

        setSelectedDate(state, {year, month}) {
            state.year = year;
            state.month = month;
        },
        setDiaryLoading(state, value) {
            state.diaryLoading = value;
        }
    },
    getters: {
        items: (state) => state.items,
        itemsCount: (state) => state.items.length,
        year: (state) => state.year,
        month: (state) => state.month,
        diaryLoading: (state) => state.diaryLoading,
    },
    actions: {
        setSelectedDate({commit, dispatch}, value) {
            commit('setSelectedDate', value);
            dispatch('getItems');
        },
        getItems({commit, getters}) {
            commit('clearError');
            commit('setDiaryLoading', true);
            const userId = getters.userId + '';
            const curYear = getters.year;
            const curMonth = getters.month;
            if (userId && curYear && curMonth) {
                firebase.firestore().collection('diary')
                .where("user", "==", userId).where("year", "==", curYear).where("month", "==", curMonth)
                .orderBy("day").orderBy("am", 'desc')
                .get().then((snapshot) => {
                    //console.log(snapshot, snapshot.size);
                    let ladderArray = [];
                    let lastDay;
                    snapshot.forEach((doc) => {
                        let _data = doc.data();
                        _data.amtext = _data.am ? 'Утро' : 'Вечер';
                        _data.secondDay = (lastDay === _data.day);
                        lastDay = _data.day;
                        ladderArray.push(_data);
                    });
                    //console.log('RES!!!!!!', ladderArray);
                    commit('setItems', ladderArray);
                }).catch(error => commit('setError', error)).finally(() => {
                    commit('setDiaryLoading', false);
                });
            }
        }
    }
}