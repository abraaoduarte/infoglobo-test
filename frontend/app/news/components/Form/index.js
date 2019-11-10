import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
  Input,
  Layout,
  Col,
  Row,
  Button,
  Spin,
  Typography,
  DatePicker,
} from 'antd';
import { dotPathOr } from 'ramda-extension';
import { compose } from 'ramda';
import './styles.sass';
import moment from 'moment';

const { TextArea } = Input;
const FormItem = Form.Item;
const { Content } = Layout;
const { Title } = Typography;

class NewsForm extends Component {
  form(path, or = null) {
    return dotPathOr(or, path, this.props.data || {});
  }

  render() {
    const {
      form: { getFieldDecorator },
      loading,
    } = this.props;

    return (
      <Spin spinning={loading.form || loading.news}>
        <Content className="content-form">
          <Form>
            <div>
              <Row>
                <Col>
                  <Title level={3}>Cadastro de Notícias</Title>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col span={6}>
                  <FormItem label="Título">
                    {getFieldDecorator('title', {
                      initialValue: this.form('title'),
                      rules: [
                        { required: true, message: 'Por favor, insira o título.', whitespace: true },
                      ],
                    })(<Input placeholder="Título" />)}
                  </FormItem>
                </Col>
                <Col span={6}>
                  <FormItem label="Data de publicação">
                    {getFieldDecorator('publication_date', {
                      initialValue: this.form('publication_date') ? moment(this.form('publication_date')) : moment(),
                      rules: [
                        { required: true, message: 'Por favor, insira a data da publicação.' },
                      ],
                    })(
                      <DatePicker
                        format="DD/MM/YYYY"
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row gutter={24}>
                <Col>
                  <FormItem label="Conteúdo">
                    {getFieldDecorator('content', {
                      initialValue: this.form('content'),
                      rules: [
                        { required: true, message: 'Por favor, insira o conteúdo.', whitespace: true },
                      ],
                    })(
                      <TextArea
                        placeholder="Conteúdo"
                        autoSize={{ minRows: 5, maxRows: 10 }}
                      />,
                    )}
                  </FormItem>
                </Col>
              </Row>
              <Row>
                <Button
                  type="primary"
                  loading={loading.form}
                  onClick={(event) => {
                    if (!loading.form) {
                      this.props.onSubmit(event, this.props.form);
                    }
                  }}
                >
                  Salvar
                </Button>

                <Button
                  style={{ marginLeft: 10 }}
                  type="default"
                  onClick={this.props.onCancel}
                >
                  Cancelar
                </Button>
              </Row>
            </div>
          </Form>
        </Content>
      </Spin>
    );
  }
}

NewsForm.propTypes = {
  form: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.object,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};


const FormCreate = Form.create();

export default compose(
  FormCreate,
)(NewsForm);
