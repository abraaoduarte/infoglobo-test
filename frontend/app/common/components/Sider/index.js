import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import Menu from '../Menu';
import ScrollBar from '../ScrollBar';
import './styles.sass';


const Sider = props => (
  <Layout.Sider
    width={256}
    theme="light"
    breakpoint="lg"
    trigger={null}
    onBreakpoint={props.isMobile ? null : props.onCollapseChange}
    className="Sider"
  >
    <div className="Brand">
      <div className="Brand__logo">
        <h1>INFOGLOBO</h1>
      </div>
    </div>

    <div className="menu-container">
      <ScrollBar options={{ suppressScrollX: true }}>
        <Menu
          menus={props.menus}
          theme={props.theme}
          isMobile={props.isMobile}
          collapsed={props.collapsed}
          onCollapseChange={props.onCollapseChange}
          user={props.user}
        />
      </ScrollBar>
    </div>
  </Layout.Sider>
);

Sider.propTypes = {
  collapsed: PropTypes.bool,
  isMobile: PropTypes.bool,
  menus: PropTypes.object,
  onCollapseChange: PropTypes.func,
  theme: PropTypes.object,
  user: PropTypes.object,
};

export default Sider;
