import * as types from '../actions/types';

let initialState = {
    clientList: [],
    currentClient: {}
};

const clientReducers = (state = initialState, action) => {
    switch (action.type) {

        case types.ECLIPSE_SEARCH_RESPONSE:
            return Object.assign({}, state, {
                clientList: action.data
            });

        default:
            return state;
    }
};

export default clientReducers;