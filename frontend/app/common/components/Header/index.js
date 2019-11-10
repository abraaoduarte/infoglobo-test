import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Menu,
  Layout,
} from 'antd';

import './styles.sass';

const { SubMenu } = Menu;

class Header extends PureComponent {
  handleClickMenu = event => event.key === 'SignOut' && this.props.onLogout();

  render() {
    const {
      user,
    } = this.props;

    const rightContent = [
      <Menu key="user" mode="horizontal">
        <SubMenu
          title={(
            <Fragment>
              <span style={{ color: '#999', marginRight: 4 }}>
                <span>Olá,</span>
              </span>
              <span>{user.name}</span>
            </Fragment>
          )}
        >
          <Menu.Item key="SignOut" onClick={this.handleClickMenu}>
            <span>Sair</span>
          </Menu.Item>
        </SubMenu>
      </Menu>,
    ];

    return (
      <Layout.Header
        className="Header Header--fixed"
        id="layoutHeader"
      >
        <div className="right-container">{rightContent}</div>
      </Layout.Header>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  onLogout: PropTypes.func,
};

export default Header;
