import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { Switch, withRouter, Route } from 'react-router-dom';
import { push } from 'connected-react-router';
import { Helmet } from 'react-helmet';

import injectReducer from 'utils/injectReducer';
import get from 'utils/get';
import reducer from 'news/reducers';
import {
  NewsListContainer,
  NewsCreateContainer,
  NewsUpdateContainer,
  NewsInformationContainer,
} from 'news/containers';

const { Content } = Layout;

const News = props => (
  <Layout style={{ display: 'flex' }}>
    <Helmet>
      <title>Notícias</title>
    </Helmet>
    <Content>
      <Switch location={props.location}>
        <Route
          exact
          path="/news"
          component={NewsListContainer}
        />
        <Route
          exact
          path="/news/create"
          component={NewsCreateContainer}
        />
        <Route
          exact
          path="/news/:id/update"
          component={NewsUpdateContainer}
        />
        <Route
          exact
          path="/news/:id/details"
          component={NewsInformationContainer}
        />
      </Switch>
    </Content>
  </Layout>
);

const mapStateToProperties = state => ({
  location: get(state, 'route.location'),
});

const mapActionToProperties = {
  push,
};

const withConnect = connect(
  mapStateToProperties,
  mapActionToProperties,
);

const withReducer = injectReducer({ key: 'news', reducer });

News.propTypes = {
  location: PropTypes.object,
};

export default compose(
  withRouter,
  withReducer,
  withConnect,
)(News);
