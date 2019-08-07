import { cpus } from "os";

export default {
    state: {
        error: null,
        lang: 'en'
    },
    mutations: {
        setError(state, errorText) {
            state.error = errorText;
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