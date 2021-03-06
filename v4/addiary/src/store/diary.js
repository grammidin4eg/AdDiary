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
                    let lastDayPm;
                    const curDate = new Date(curYear, (curMonth - 1), 1);
                    function isPmValue(item) {
                      if (!item || !item.time) {
                         return null;
                      }
                      return (parseInt(item.time.substr(0, 2), 10) > 17);
                    }
                    snapshot.forEach((doc) => {
                        let _data = doc.data();
                        _data.isPm = isPmValue(_data);
                        _data.secondDay = (lastDay === _data.day);
                        _data.secondDayPm = ((lastDayPm === _data.isPm) && (lastDay === _data.day));
                        _data.id = doc.id;
                        _data.date = new Date(curDate.setDate(_data.day));
                        lastDay = _data.day;
                        lastDayPm = _data.isPm;
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
                .then(() => {
                   dispatch('getItems');
                })
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
                .then(() => {
                   dispatch('getItems');
                })
                .catch((error) => {
                    commit('setError', error)
                    dispatch('getItems');
                })
            }
        },

        deleteItem({commit, dispatch}, id) {
            if (id) {
                firebase.firestore().collection("diary").doc(id).delete()
                .then(() => {
                   dispatch('getItems');
                })
                .catch((error) => {
                    commit('setError', error)
                    dispatch('getItems');
                })
            }
        }
    }
}