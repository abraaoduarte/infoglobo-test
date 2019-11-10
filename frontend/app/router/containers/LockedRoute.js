import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SpinFull } from 'common/components';
import { Route, Redirect } from 'react-router-dom';
import { verifyLogin } from 'login/actions/auth';
import get from 'utils/get';

class LockedRoute extends Component {
  renderRoute = (routeProperties, Component) => {
    const { isLoading, dispatch, user } = this.props;

    if (isLoading) {
      dispatch(verifyLogin());
      return (<SpinFull spinning />);
    }

    if (user) {
      return <Component {...routeProperties} />;
    }

    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { from: routeProperties.location },
        }}
      />
    );
  }

  render() {
    const { component: Component, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={routeProperties => this.renderRoute(routeProperties, Component)}
      />
    );
  }
}

LockedRoute.propTypes = {
  dispatch: PropTypes.func,
  isLoading: PropTypes.bool,
  user: PropTypes.object,
  component: PropTypes.func,
};

export default connect(state => ({
  user: get(state, 'login.auth.user'),
  isLoading: get(state, 'login.auth.isLoading'),
}))(LockedRoute);
