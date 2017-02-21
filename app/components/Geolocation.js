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
                var pos = JSON.stringify(position);
                this.setState({ position: pos });                                //
                this.props.updateLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                });
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
        console.log('props', this.props);                    //
        return (
            <View>
                <Text>
                    Lat: {this.props.location.lat}, Lon: {this.props.location.lon}
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
