import { ACTIONS } from '../actions/action-types';
import { FORM_STATES } from '../actions/form-states';

const initialState = {
    list: [],
    formState: FORM_STATES.CHOOSE
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACTIONS.LIST_LOADED:
            return {
                list: action.payload
            }
        case ACTIONS.OPEN_REGISTRATION:
            return {
                formState: FORM_STATES.REGISTRATION
            }
        case ACTIONS.OPEN_LOGIN:
            return {
                formState: FORM_STATES.LOGIN
            }
        default:
        return state;
    }
};

export default reducer;