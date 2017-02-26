import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import LoginForm from './LoginForm';

export default class Login extends React.Component {

    componentDidUpdate() {
        if (this.props.client.authenticated) {
            Actions.location();
        }
    }

    render() {
        let { storeAuthToken, client } = { ...this.props };
        return (
            <KeyboardAvoidingView
                behavior="padding"
                style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require('../images/logo.png')} />
                    <ActivityIndicator
                        animating={client.fetching}
                        style={[styles.centered, { height: 80 }]}
                        color="white"
                        size="large"
                    />
                </View>
                <View style={styles.formContainer}>
                    <LoginForm parentProps={this.props} />
                </View>
            </KeyboardAvoidingView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 200,
        height: 100
    },
    formContainer: {

    },
    centred: {
        alignItems: 'center'
    }
});
