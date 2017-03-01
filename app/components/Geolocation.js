import React from 'react';
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

    componentDidUpdate(prevProps) {
        if (this.props.location.postcode !== prevProps.location.postcode) {
            this.props.searchByPostcode(this.props.location.postcode);
        }
    }

    render() {
        let { location, client } = { ...this.props };
        // console.log(client.clientList)     //
        return (
            <View style={styles.container}>
                <View style={styles.locationContainer}>
                    <Text>
                        Lat: {location.lat}, Lon: {location.lon}
                    </Text>
                    <Text>
                        Postcode: {location.postcode}
                    </Text>
                </View>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    locationContainer: {
        marginTop: 60,
        alignItems: 'center',
        flexGrow: 1,
    },
    title: {
        fontWeight: '500',
        color: '#262626'
    },
});

export default Geolocation;
