import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'utils/get';
import DashboardScreen from 'dashboard/screens/DashboardScreen';

const DashboardContainer = props => (
  <DashboardScreen
    user={props.user}
  />
);

const mapStateToProperties = state => ({
  user: get(state, 'login.auth.user'),
});

const mapActionsToProperties = {};

DashboardContainer.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProperties, mapActionsToProperties)(DashboardContainer);
