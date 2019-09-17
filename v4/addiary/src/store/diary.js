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
                .orderBy("day").orderBy("time", 'asc')
                .get().then((snapshot) => {
                    let ladderArray = [];
                    let lastDay;
                    snapshot.forEach((doc) => {
                        let _data = doc.data();
                        _data.amtext = _data.am ? 'Утро' : 'Вечер';
                        _data.secondDay = (lastDay === _data.day);
                        _data.id = doc.id;
                        lastDay = _data.day;
                        ladderArray.push(_data);
                    });
                    //console.log('RES!!!!!!', ladderArray);
                    commit('setItems', ladderArray);
                }).catch(error => commit('setError', error)).finally(() => {
                    commit('setDiaryLoading', false);
                });
            }
        },
        setItem({commit, dispatch, getters}, _value) {
            if (_value && _value.id) {
                const value = Object.assign({}, _value);
                const id = _value.id;
                delete value.id;
                delete value.timeMask;

                value.year = getters.year;
                value.month = getters.month;
                value.user = getters.userId;

                firebase.firestore().collection("diary").doc(id).set(value)
                .then(() => {})
                .catch((error) => {
                    commit('setError', error)
                    dispatch('getItems');
                })
            }
        },

        addItem({commit, dispatch, getters}, _value) {
            if (_value) {
                const value = Object.assign({}, _value);
                value.year = getters.year;
                value.month = getters.month;
                value.user = getters.userId;
                delete value.timeMask;

                firebase.firestore().collection("diary").add(value)
                .then(() => {})
                .catch((error) => {
                    commit('setError', error)
                    dispatch('getItems');
                })
            }
        },

        deleteItem({commit, dispatch}, id) {
            if (id) {
                firebase.firestore().collection("diary").doc(id).delete()
                .catch((error) => {
                    commit('setError', error)
                    dispatch('getItems');
                })
            }
        }
    }
}