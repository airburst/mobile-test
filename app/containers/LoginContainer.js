import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ClientActions from '../actions/ClientActions';
import Login from '../components/Login';

function mapStateToProps(state) {
  return {
    client: state.client
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ClientActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);