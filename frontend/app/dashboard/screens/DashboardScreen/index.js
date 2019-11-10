import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import './styles.sass';

const DashboardScreen = props => (
  <Layout className="Dashboard">
    <p className="Dashboard__description">Bem vindo!</p>
    <p className="Dashboard__sub">
      <b>{props.user.name}</b>
    </p>
  </Layout>
);

DashboardScreen.propTypes = {
  user: PropTypes.object,
};

export default DashboardScreen;
