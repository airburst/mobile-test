import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions/LocationActions';
import Geolocation from '../components/Geolocation';

function mapStateToProps(state) {
  return {
    location: state.location
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Geolocation);