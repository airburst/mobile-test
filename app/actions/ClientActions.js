import { AsyncStorage } from 'react-native';
import * as types from './types';
import EclipseRestService from '../services/EclipseRestService';

const eclipseService = new EclipseRestService(1);
const AUTH_TOKEN = 'AUTH_TOKEN';

export const startFetch = () => {
    return {
        type: types.START_FETCH
    };
};

export const endFetch = () => {
    return {
        type: types.END_FETCH
    };
};

export const setName = (data) => {
    return {
        type: types.SET_NAME,
        data
    };
};

export const setPassword = (data) => {
    return {
        type: types.SET_PASSWORD,
        data
    };
};

export const setToken = (data) => {
    return {
        type: types.SET_TOKEN,
        data
    };
};

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
export const getAuthToken = () => {
    console.log('getting token')
    return (dispatch) => {
        AsyncStorage.getItem(AUTH_TOKEN)
            .then(token => {
                console.log('got', token);
                dispatch(setToken(token));
            })
            .catch(err => console.log('Error getting auth token', err));
    };
};

export const storeAuthToken = (token) => {
    return (dispatch) => {
        AsyncStorage.setItem(AUTH_TOKEN, token)
            .then(() => AsyncStorage.getItem(AUTH_TOKEN)
                .then(token => {
                    // setTimeout(() => {
                    dispatch(setToken(token));
                    dispatch(endFetch())
                    // }, 2000);
                })
                .catch(err => console.log('Error getting auth token', err))
            )
            .catch(err => console.log('Error storing auth token', err))
    };
};

export const login = (user, password) => {
    return (dispatch) => {
        dispatch(startFetch())
        //DEBUG
        dispatch(storeAuthToken(user + password));
        // return eclipseService.auth({ postCode: postcode })
        //     .then(c => {
        //          dispatch(storeAuthToken(user + password));
        //          dispatch(eclipseSearchData(c)); // with token
        //      })
        //     .catch(err => console.log('Error fetching postcode data:', err));
    };
};

export const searchByPostcode = (postcode) => {
    return (dispatch) => {
        dispatch(eclipseSearch());
        return eclipseService.search({ postCode: postcode })
            .then(c => dispatch(eclipseSearchData(c)))
            .catch(err => console.log('Error fetching postcode data:', err));   // dispatch error
    };
};
