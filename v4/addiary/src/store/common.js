import {getErrorText} from './error-code'

export default {
    state: {
        error: null,
        lang: 'en'
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
        }
    },
    getters: {
        getError: (state) => state.error,
        isError: (state) => !!state.error,
        lang: (state) => state.lang
    },
    actions: {
        setLang({commit}, lang) {
            commit('setLang', lang);
        }
    }
}