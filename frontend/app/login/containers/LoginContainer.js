import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import get from 'utils/get';
import LoginScreen from 'login/screens/LoginScreen';
import * as actions from 'login/actions/auth';
import { push } from 'connected-react-router';

class LoginContainer extends Component {
  componentDidMount() {
    this.props.verifyLogin()
      .then((isLoggedIn) => {
        if (isLoggedIn) {
          this.props.push('/');
        }
      });
  }

  handleLoginFormSubmit = (values) => {
    this.props.auth(values);
  }

  render() {
    return (
      <LoginScreen
        isLoading={this.props.isLoading}
        onSubmit={this.handleLoginFormSubmit}
      />
    );
  }
}

const mapStateToProperties = state => ({
  isLoading: get(state, 'login.auth.isLoading'),
});

const mapActionsToProperties = { ...actions, push };

LoginContainer.propTypes = {
  isLoading: PropTypes.bool,
  auth: PropTypes.func,
  push: PropTypes.func,
  verifyLogin: PropTypes.func,
};

export default connect(mapStateToProperties, mapActionsToProperties)(LoginContainer);
