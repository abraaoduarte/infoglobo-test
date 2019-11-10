import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  Spin,
  Layout,
  Row,
  Popconfirm,
  Button,
  Divider,
  Col,
} from 'antd';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import './styles.sass';

const { Content } = Layout;

const NewsList = (props) => {
  const {
    onEdit,
    onDelete,
    onInformation,
  } = props;


  const columns = [
    {
      title: 'Título',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Contéudo',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Data de publicação',
      dataIndex: 'publication_date',
      key: 'publication_date',
      render: (text, record) => moment(record.publication_date).format('DD/MM/YYYY'),
    },
    {
      title: 'Criado em',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text, record) => moment(record.created_at).format('DD/MM/YYYY'),
    },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      width: '10%',
      render: (text, record) => (
        <Row>
          <Button
            title="Detalhes da notícia"
            size="small"
            onClick={() => onInformation(record._id)}
            icon="folder-open"
          />
          <Divider type="vertical" />
          <Button
            onClick={() => onEdit(record._id)}
            size="small"
            icon="edit"
            title="Editar notícia"
          />
          <Divider type="vertical" />
          <Popconfirm
            title="Tem certeza que deseja deletar esta notícia?"
            okText="Sim"
            cancelText="Cancelar"
            onConfirm={() => onDelete(record._id)}
          >
            <Button
              type="danger"
              size="small"
              icon="delete"
              title="Deletar notícia"
            />
          </Popconfirm>
        </Row>
      ),
    },
  ];

  const data = props.news.map(item => ({
    ...item,
    actions: item,
  }));


  return (
    <Spin spinning={props.isLoading}>
      <Row type="flex" justify="end" className="ant-form-item">
        <Col>
          <Button>
            <NavLink
              exact
              to="/news/create"
            >
              Novo
            </NavLink>
          </Button>
        </Col>
      </Row>
      <Content className="content-table">
        <Table
          dataSource={data}
          columns={columns}
          rowKey="_id"
        />
      </Content>
    </Spin>
  );
};

NewsList.propTypes = {
  news: PropTypes.array,
  isLoading: PropTypes.bool,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onInformation: PropTypes.func,
};

export default (NewsList);
