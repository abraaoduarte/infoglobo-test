import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Icon,
  Input,
  Button,
  Row,
  Col,
} from 'antd';
import logo from 'login/images/infoglobo.jpg';

import './styles.sass';

const FormItem = Form.Item;

class LoginForm extends Component {
  static defaultProps = {
    onSubmit: () => {},
  };

  handleSubmit = (error) => {
    error.preventDefault();
    this.props.form.validateFields((error, values) => {
      if (!error) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const makeEmail = getFieldDecorator('email', {
      rules: [
        { required: true, message: 'Por favor, insira seu email.', whitespace: true },
        { type: 'email', message: 'Por favor, utilize um email válido.' },
      ],
    });
    const makePassword = getFieldDecorator('password', {
      rules: [{
        required: true,
        message: 'Por favor, insira sua senha.',
        whitespace: true,
      }],
    });

    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={24} className="login-form">
          <Col>
            <img className="login-form__logo" src={logo} alt="INFOGLOBO" />
            <FormItem>
              {makeEmail(
                <Input
                  type="email"
                  disabled={this.props.isLoading}
                  prefix={<Icon type="user" />}
                  placeholder="Email"
                />,
              )}
            </FormItem>
            <FormItem>
              {makePassword(
                <Input
                  type="password"
                  disabled={this.props.isLoading}
                  prefix={<Icon type="lock" />}
                  placeholder="Senha"
                />,
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form__submit-button"
                loading={this.props.isLoading}
              >
                Entrar
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

LoginForm.propTypes = {
  isLoading: PropTypes.bool,
  getFieldDecorator: PropTypes.object,
  form: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default Form.create()(LoginForm);
