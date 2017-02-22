import { combineReducers } from 'redux';
import locationReducers from './locationReducers';
import clientReducers from './clientReducers';

const rootReducer = combineReducers({
    location: locationReducers,
    client: clientReducers
});

export default rootReducer;