export const REQUEST_DATA = 'REQUEST_DATA';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const UPDATE_LOCATION = 'UPDATE_LOCATION';

export const requestData = () => {
    return {
        type: REQUEST_DATA
    };
};

export const receiveData = (data) => {
    return {
        type: RECEIVE_DATA,
        data
    };
};

export const updateLocation = (data) => {
    return {
        type: UPDATE_LOCATION,
        data
    };
};


// Action Creators
export const fetchData = () => {
    return (dispatch) => {
        dispatch(requestData());
        return setTimeout(() => {
            const data = { message: 'Hello' };
            dispatch(receiveData(data));
        }, 300);
    };
};