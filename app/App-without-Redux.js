import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import Geolocation from './components/Geolocation';
import PostcodeService from './services/PostcodeService';

class App extends Component {

    constructor() {
        super();
        this.state = {
            postcode: ''
        }
        this.postcodeService = new PostcodeService();
    }

    setPostcode() {
        this.postcodeService.getPostcode(51.4174, -2.21022)
            .then(p => this.setState({ postcode: p }))
            .catch(err => console.log('Error fetching postcode data:', err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Test App
                </Text>
                <Geolocation />
                <Text>Postcode: {this.state.postcode}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
    },
});

export default App;
