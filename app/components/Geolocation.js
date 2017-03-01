import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView
} from 'react-native';

class Geolocation extends React.Component {

    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
    }

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

    renderRow(rowData, sectionID, rowID, highlightRow) {
        let title = (rowData.title) ? rowData.title + ' ' : '',
            age = (rowData.age > -1) ? rowData.age : '',
            name = `${title}${rowData.name}`;
        return (
            <View style={styles.row}>
                <Text style={styles.nameField}>{name}</Text>
                <Text style={styles.ageField}>{age}</Text>
                <Text style={styles.field}>{rowData.ethnicity}</Text>
            </View>
        );
    }

    render() {
        let { location, client } = { ...this.props };

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
                <View style={styles.list}>
                    <ListView
                        contentContainerStyle={styles.list}
                        dataSource={this.ds.cloneWithRows(client.clientList)}
                        renderRow={this.renderRow} />
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
        height: 60
    },
    list: {
        flex: 1
    },
    row: {
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderTopColor: '#f9f9f9',
        borderTopWidth: 1,
        flexDirection: 'row'
    },
    nameField: {
        flex: 2
    },
    ageField: {
        marginRight: 20
    },
    field: {
        flex: 1
    },
    title: {
        fontWeight: '500',
        color: '#262626'
    },
});

export default Geolocation;
