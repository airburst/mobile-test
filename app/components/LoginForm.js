import React from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableHighlight,
    StatusBar
} from 'react-native';

export default class LoginForm extends React.Component {

    render() {
        let loginProps = this.props.parentProps,
            client = loginProps.client;

        // user textinput: autoCorrect="none" autoCapitalize={false}
        return (
            <View style={styles.container}>
                <StatusBar
                    barStyle="light-content" />
                <TextInput
                    placeholder="username"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="next"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType="email-address"
                    style={styles.input}
                    value={client.user}
                    onChangeText={ (text) => loginProps.setName(text) }
                />
                <TextInput
                    placeholder="password"
                    placeholderTextColor="rgba(255,255,255,0.7)"
                    returnKeyType="go"
                    secureTextEntry
                    style={styles.input}
                    ref={ (input) => this.passwordInput = input }
                    value={client.password}
                    onChangeText={ (text) => loginProps.setPassword(text) }
                />
                <TouchableHighlight
                    onPress={ () => loginProps.login(client.user, client.password) }
                    style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>
                        LOGIN
                    </Text>
                </TouchableHighlight>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#2980b9',
        paddingVertical: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFF',
        fontWeight: '700'
    }
});
