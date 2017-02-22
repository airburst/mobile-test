import * as types from '../actions/types';

let initialState = {
    lat: 'unknown',
    lon: 'unknown',
    postcode: 'unknown'
};

const locationReducers = (state = initialState, action) => {
    switch (action.type) {

        case types.UPDATE_LOCATION:
            return Object.assign({}, state, {
                lat: action.data.lat,
                lon: action.data.lon
            });

        case types.RECEIVE_POSTCODE:
            return Object.assign({}, state, {
                postcode: action.data
            });

        default:
            return state;
    }
};

export default locationReducers;