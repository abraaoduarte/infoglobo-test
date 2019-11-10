import React from 'react';
import PropTypes from 'prop-types';
import { Layout, Row, Col } from 'antd';
import LoginForm from 'login/components/LoginForm';

import './styles.sass';

const { Content } = Layout;

const LoginScreen = props => (
  <Layout className="login-content">
    <Content className="login-content__content">
      <Row type="flex" justify="center" align="middle">
        <Col span={6}>
          <LoginForm
            isLoading={props.isloading}
            onSubmit={props.onSubmit}
          />
        </Col>
      </Row>
    </Content>
  </Layout>
);

LoginScreen.propTypes = {
  isloading: PropTypes.bool,
  onSubmit: PropTypes.func,
};

export default LoginScreen;
