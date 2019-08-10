import firebase from 'firebase'

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
            commit('setError', null);
            const userId = getters.userId;
            if (userId) {
                //
            }
        }
    }
}