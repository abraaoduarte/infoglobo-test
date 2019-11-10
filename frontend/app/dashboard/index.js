import React from 'react';
import { Helmet } from 'react-helmet';
import DashboardContainer from 'dashboard/containers/DashboardContainer';

const Dashboard = () => (
  <div>
    <Helmet>
      <title>Dashboard - INFOGLOBO</title>
    </Helmet>
    <DashboardContainer />
  </div>
);

export default Dashboard;
