import { combineReducers } from 'redux';
import * as types from '../actions';

let initialState = {
    lat: 'unknown',
    lon: 'unknown',
    postcode: 'unknown'
};

const location = (state = initialState, action) => {
    switch (action.type) {

        case types.UPDATE_LOCATION:
            return Object.assign({}, state, {
                lat: action.data.lat,
                lon: action.data.lon
            });

        default:
            return state;
    }
};

const rootReducer = combineReducers({
    location
});

export default rootReducer;