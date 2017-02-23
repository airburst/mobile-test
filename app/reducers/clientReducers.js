import * as types from '../actions/types';

let initialState = {
    user: 'TSteer',
    password: 'OLM12345!',
    authToken: 'NO TOKEN',
    clientList: [],
    currentClient: {}
};

const clientReducers = (state = initialState, action) => {
    switch (action.type) {

        case types.SET_NAME:
            return Object.assign({}, state, {
                user: action.data
            });

        case types.SET_PASSWORD:
            return Object.assign({}, state, {
                password: action.data
            });

        case types.SET_TOKEN:
            return Object.assign({}, state, {
                authToken: action.data
            });

        case types.ECLIPSE_SEARCH_RESPONSE:
            return Object.assign({}, state, {
                clientList: action.data
            });

        default:
            return state;
    }
};

export default clientReducers;