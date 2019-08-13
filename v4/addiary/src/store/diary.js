import firebase from 'firebase'

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
        setSelectedDate({commit, dispatch}, value) {
            commit('setSelectedDate', value);
            dispatch('getItems');
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
                        let _data = doc.data().value;
                        _data.amsys = _data.am.sys;
                        _data.amdia = _data.am.dia;
                        _data.ampulse = _data.am.pulse;

                        _data.pmsys = _data.pm.sys;
                        _data.pmdia = _data.pm.dia;
                        _data.pmpulse = _data.pm.pulse;

                        ladderArray.push(_data);
                    });
                    console.log('RES!!!!!!', ladderArray);
                    commit('setItems', ladderArray);
                }).catch(error => commit('setError', error));
            }
        }
    }
}