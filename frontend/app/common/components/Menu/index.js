import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu as AntMenu } from 'antd';
import { NavLink } from 'react-router-dom';
import './styles.sass';

class Menu extends Component {
  onOpenChange = (openKeys) => {
    this.props.setOpenKeysMenu(openKeys);
  }

  render() {
    const {
      theme,
      isMobile,
      onCollapseChange,
    } = this.props;

    return (
      <AntMenu
        mode="inline"
        theme={theme}
        onOpenChange={this.onOpenChange}
        selectedKeys={[]}
        defaultOpenKeys={[]}
        className="menu"
        onClick={
          isMobile
            ? () => {
              onCollapseChange(true);
            }
            : undefined
        }
      >
        <AntMenu.Item className="ant-menu-item menu-item-dashboard" key="dashboard">
          <NavLink
            exact
            activeClassName="active"
            to="/"
          >
            <span className="menu-text">Dashboard</span>
          </NavLink>
        </AntMenu.Item>
        <AntMenu.Item className="ant-menu-item menu-item-dashboard" key="news">
          <NavLink
            exact
            activeClassName="active"
            to="/news"
          >
            <span className="menu-text">Notícias</span>
          </NavLink>
        </AntMenu.Item>
      </AntMenu>
    );
  }
}

Menu.propTypes = {
  theme: PropTypes.object,
  isMobile: PropTypes.bool,
  onCollapseChange: PropTypes.func,
  setOpenKeysMenu: PropTypes.func,
};

export default Menu;
