import * as types from './types';
import PostcodeService from '../services/PostcodeService';

const postcodeService = new PostcodeService();

export const lookupPostcode = () => {
    return {
        type: types.LOOKUP_POSTCODE
    };
};

export const receivePostcode = (data) => {
    return {
        type: types.RECEIVE_POSTCODE,
        data
    };
};

export const updateLocation = (data) => {
    return {
        type: types.UPDATE_LOCATION,
        data
    };
};

// Action Creators
export const getPostcode = (lat, lon) => {
    return (dispatch) => {
        dispatch(lookupPostcode());
        return postcodeService.getPostcode(lat, lon)
            .then(p => dispatch(receivePostcode(p)))
            .catch(err => console.log('Error fetching postcode data:', err));   // dispatch error
    };
};
