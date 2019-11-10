import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import { logout } from 'login/actions/auth';
import NotFound from 'common/components/NotFound';
import UnknownError from 'common/components/UnknownError';
import { Layout } from 'common/components';
import Dashboard from 'dashboard';
import News from 'news';
import get from 'utils/get';

class Index extends Component {
  handleLogout = () => {
    this.props.dispatch(logout());
  }

  componentDidCatch(error) {
    console.error(error);
    this.props.dispatch(push('/error'));
  }

  render() {
    return (
      <Layout onLogout={this.handleLogout} user={this.props.user}>
        <Switch location={this.props.location}>
          <Route exact path="/" component={Dashboard} />
          <Route path="/news/:action?" component={News} />
          <Route exact path="/error" component={UnknownError} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProperties = state => ({
  location: get(state, 'route.location'),
  user: get(state, 'login.auth.user'),
});

Index.propTypes = {
  location: PropTypes.object,
  dispatch: PropTypes.func,
  user: PropTypes.object,
};

export default withRouter(connect(mapStateToProperties)(Index));
