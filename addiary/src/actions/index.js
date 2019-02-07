import { ACTIONS } from './action-types';
const listLoaded = (list) => {
    return {
        type: ACTIONS.LIST_LOADED,
        payload: list
    }
};


export {
    listLoaded
};