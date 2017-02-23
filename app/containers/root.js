import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configure-store';
import AppContainer from './AppContainer';
import LoginContainer from './LoginContainer';

const store = configureStore();

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <LoginContainer />
            </Provider>
        );
    }
}

export default Root;