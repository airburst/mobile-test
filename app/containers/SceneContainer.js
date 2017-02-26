import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import LoginContainer from './LoginContainer';
import LocationContainer from './LocationContainer';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="login" component={LoginContainer} title="Login" initial={true} />
                    <Scene key="location" component={LocationContainer} title="Location" />
                </Scene>
            </Router>
        )
    }
}