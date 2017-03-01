import * as types from '../actions/types';

let initialState = {
    user: 'TSteer',
    password: 'SImpsons123!',
    authenticated: false,
    authToken: 'NO TOKEN',      //
    fetching: false,
    clientList: [],
    currentClient: {}
};

const clientReducers = (state = initialState, action) => {
    switch (action.type) {

        case types.START_FETCH:
            return Object.assign({}, state, {
                fetching: true
            });

        case types.END_FETCH:
            return Object.assign({}, state, {
                fetching: false
            });

        case types.AUTHENTICATED:
            return Object.assign({}, state, {
                authenticated: true
            });

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