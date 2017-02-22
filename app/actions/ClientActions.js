import * as types from './types';
import EclipseRestService from '../services/EclipseRestService';

const eclipseService = new EclipseRestService(1);

export const eclipseSearch = () => {
    return {
        type: types.ECLIPSE_SEARCH_REQUEST
    };
};

export const eclipseSearchData = (data) => {
    return {
        type: types.ECLIPSE_SEARCH_RESPONSE,
        data
    };
};

export const updateClientList = (data) => {
    return {
        type: types.UPDATE_CLIENT_LIST,
        data
    };
};

// Action Creators
export const searchByPostcode = (postcode) => {
    return (dispatch) => {
        dispatch(eclipseSearch());
        return eclipseService.search({ postCode: postcode })
            .then(c => dispatch(eclipseSearchData(c)))
            .catch(err => console.log('Error fetching postcode data:', err));   // dispatch error
    };
};
