import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Layout,
  Drawer,
  Breadcrumb,
} from 'antd';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import { compose } from 'ramda';
import { enquireScreen, unenquireScreen } from 'enquire-js';
import get from 'utils/get';
import './styles.sass';
import { withRouter, NavLink } from 'react-router-dom';
import pathToRegexp from 'path-to-regexp';
import Header from '../Header';
import Sider from '../Sider';
import breadcrumbs from './breadcrumbs';


const { Content } = Layout;

class BaseLayout extends Component {
  state = {
    isMobile: false,
  }

  handleMenuSelected = ({ key }) => {
    if (key === 'logout') {
      if (this.props.onLogout) {
        return this.props.onLogout();
      }

      return false;
    }

    return this.props.push(key);
  };

  isSelected = needle => this.props.location.pathname.startsWith(needle);

  selected = needle => (this.isSelected(needle) ? 'ant-menu-item-selected' : '');

  handleLogout = (error) => {
    error.preventDefault();
    error.stopPropagation();
    if (this.props.onLogout) {
      this.props.onLogout();
    }
  };

  componentDidMount() {
    this.enquireHandler = enquireScreen((mobile) => {
      const { isMobile } = this.state;
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        });
      }
    });
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }

  handleClose = () => {
    this.setState(prevState => ({ collapsed: !prevState.collapsed }));
  }

  generateBreadcrumbs = () => {
    const { location: { pathname: url } } = this.props;

    const routes = Object.keys(breadcrumbs)
      .map((path) => {
        const keys = [];
        const regex = pathToRegexp(path, keys);
        return {
          path,
          regex,
          keys,
          compiler: pathToRegexp.compile(path),
        };
      })
      .reduce((route, {
        path, regex, keys, compiler,
      }) => {
        const result = regex.exec(url);
        if (!result) {
          return {
            ...route,
            [path]: { path, compiler, params: null },
          };
        }

        return {
          ...route,
          [path]: {
            path,
            compiler,
            params: result.slice(1).reduce((params, value, n) => ({
              ...params,
              [keys[n].name]: value,
            }), {}),
          },
        };
      }, {});

    const current = Object.values(routes)
      .find(route => route.params);

    if (!current) {
      return [];
    }

    const list = breadcrumbs[current.path] || [];
    return list.map(({ path, title }) => (
      path && routes[path] ? (
        <Breadcrumb.Item key={title}>
          <NavLink exact to={routes[path].compiler(current.params)}>
            {title}
          </NavLink>
        </Breadcrumb.Item>
      ) : (
        <Breadcrumb.Item key={title}>
          <span>{title}</span>
        </Breadcrumb.Item>
      )
    ));
  };

  render() {
    const { isMobile } = this.state;
    return (
      <Layout className="Layout">
        {isMobile ? (
          <Drawer
            maskClosable
            closable={false}
            onClose={this.handleClose}
            placement="left"
            width={200}
            style={{ padding: 0, height: '100vh' }}
          >
            <Sider
              isMobile={isMobile}
              collapsed={false}
              user={this.props.user}
            />
          </Drawer>
        ) : (
          <Sider
            isMobile={isMobile}
            openKeysMenu={this.props.openKeysMenu}
            user={this.props.user}
          />
        )}
        <div
          className="container"
          style={{ paddingTop: 72 }}
          id="primaryLayout"
        >
          <Header
            className="Layout__header"
            onLogout={this.props.onLogout}
            fixed
            user={this.props.user}
          />
          <Content className="Layout__content">
            <Breadcrumb className="Layout__breadcrumb">
              {this.generateBreadcrumbs()}
            </Breadcrumb>
            {this.props.children}
          </Content>
        </div>
      </Layout>
    );
  }
}

const mapStateToProperties = state => ({
  location: state.getIn(['router', 'location']).toJS(),
  user: get(state, 'login.auth.user'),
});

const mapActionToProperties = {
  push,
};

const withConnect = connect(
  mapStateToProperties,
  mapActionToProperties,
);

BaseLayout.propTypes = {
  children: PropTypes.object,
  user: PropTypes.object,
  onLogout: PropTypes.func,
  openKeysMenu: PropTypes.func,
  push: PropTypes.func,
  location: PropTypes.object,
};

export default compose(
  withRouter,
  withConnect,
)(BaseLayout);
