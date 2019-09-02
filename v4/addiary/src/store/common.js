import {getErrorText} from './error-code'

export default {
    state: {
        error: null,
        lang: 'en',
        event: null
    },
    mutations: {
        setError(state, error) {
            if (!error) {
                return;
            }

            console.error('ERROR obj', error, 'code:', error.code);

            if (typeof error === 'string') {
                state.error = error;
            } else {
                state.error = getErrorText(error, state.lang);
            }
        },

        clearError(state) {
            state.error = null;
        },

        setLang(state, lang) {
            state.lang = lang;
        },

        clearEvent(state) {
            state.event = null;
        },

        setEvent(state, value) {
            state.event = value;
        }
    },
    getters: {
        getError: (state) => state.error,
        isError: (state) => !!state.error,
        lang: (state) => state.lang,
        getEvent: (state) => state.event,
    },
    actions: {
        setLang({commit}, lang) {
            commit('setLang', lang);
        },

        clearEvent({commit}) {
            commit('clearEvent');
        }
    }
}