import { ACTIONS } from './action-types';
const listLoaded = (list) => {
    return {
        type: ACTIONS.LIST_LOADED,
        payload: list
    }
};

const openRegistration = () => {
    return {
        type: ACTIONS.OPEN_REGISTRATION,
        payload: null
    }
};

const openLogin = () => {
    return {
        type: ACTIONS.OPEN_LOGIN,
        payload: null
    }
};


export {
    listLoaded,
    openRegistration,
    openLogin
};