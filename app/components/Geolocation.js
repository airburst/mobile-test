import React from 'react';
import { dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

class Geolocation extends React.Component {

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                let lat = position.coords.latitude,
                    lon = position.coords.longitude
                this.props.updateLocation({ lat, lon });
                this.props.getPostcode(lat, lon);
            },
            (error) => alert(JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        // this.watchID = navigator.geolocation.watchPosition((position) => {
        //     var lastPosition = JSON.stringify(position);
        //     this.setState({ lastPosition });
        // });
    }

    // componentWillUnmount() {
    //     navigator.geolocation.clearWatch(this.watchID);
    // }

    render() {
        let { location } = { ...this.props };
        return (
            <View>
                <Text>
                    Lat: {location.lat}, Lon: {location.lon}
                </Text>
                <Text>
                    Postcode: {location.postcode}
                </Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    title: {
        fontWeight: '500',
    },
});

export default Geolocation;
