import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Card,
  Typography,
  Spin,
  Descriptions,
  Button,
} from 'antd';
import moment from 'moment';
import './styles.sass';

const { Title } = Typography;

const NewsInformation = props => (
  <Spin spinning={props.loading.data}>
    <Row className="ant-form-item">
      <Col lg={16}>
        <Title level={3} ellipsis>
          Detalhe da notícia
        </Title>
      </Col>
    </Row>
    <Row gutter={24} className="ant-form-item">
      <Col>
        <Card title="Detalhes">
          <Descriptions layout="horizontal" column={2}>
            <Descriptions.Item label="Título">
              { props.data.title || 'Sem informação'}
            </Descriptions.Item>
            <Descriptions.Item label="Criado em">
              { props.data.created_at ? moment(props.data.created_at).format('DD/MM/YYYY') : 'Sem informação'}
            </Descriptions.Item>
            <Descriptions.Item label="Data de publicação">
              { props.data.publication_date ? moment(props.data.publication_date).format('DD/MM/YYYY') : 'Sem informação'}
            </Descriptions.Item>
            <Descriptions.Item label="Conteúdo">
              { props.data.content || 'Sem informação'}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
    </Row>
    <Row>
      <Button
        type="default"
        onClick={props.onCancel}
      >
        Cancelar
      </Button>
    </Row>
  </Spin>
);

NewsInformation.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.object,
  onCancel: PropTypes.func,
};

export default (NewsInformation);
