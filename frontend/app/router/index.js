import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from 'login';
import Index from 'common/pages/Index';
import LockedRoute from 'router/containers/LockedRoute';
import NotFound from 'common/components/NotFound';
import Dashboard from 'dashboard';

const Router = props => (
  <Switch location={props.location}>
    <Route path="/login" component={Login} />
    <LockedRoute path="/:page?" component={Index} />
    <Route component={Dashboard} />
    <Route component={NotFound} />
  </Switch>
);

Router.propTypes = {
  location: PropTypes.object,
};

export default withRouter(Router);
