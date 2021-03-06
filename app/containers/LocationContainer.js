import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as LocationActions from '../actions/LocationActions';
import * as ClientActions from '../actions/ClientActions';
import Geolocation from '../components/Geolocation';

function mapStateToProps(state) {
  return {
    location: state.location,
    client: state.client
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, LocationActions, ClientActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation);