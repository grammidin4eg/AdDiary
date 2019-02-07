import { ACTIONS } from '../actions/action-types';

const initialState = {
    list: []
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.LIST_LOADED:
            return {
                list: action.payload
            }
        default:
        return state;
    }
};

export default reducer;