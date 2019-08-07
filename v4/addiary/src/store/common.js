export default {
    state: {
        error: null
    },
    mutations: {
        setError(state, errorText) {
            state.error = errorText;
        },

        clearError(state) {
            state.error = null;
        }
    },
    getters: {
        getError: (state) => state.error,
        isError: (state) => !!state.error,
    },
    actions: {
  
    }
}