import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configure-store';
import SceneContainer from './SceneContainer';

const store = configureStore();

class Root extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SceneContainer />
            </Provider>
        );
    }
}

export default Root;