import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import get from 'utils/get';
import * as actions from 'news/actions/form';
import { Form } from 'news/components';

class NewsCreateContainer extends Component {
  componentDidMount() {
    this.props.clearForm();
    this.props.setLoadingForm(false);
  }

  handleSubmit = (event, form) => {
    form.validateFields((error, values) => {
      if (!error) {
        this.props.create(values);
      }
    });
  };

  handleCancel = () => this.props.push('/news');


  render() {
    const {
      data,
      loading,
    } = this.props;

    return (
      <Form
        data={data}
        loading={loading}
        onSubmit={this.handleSubmit}
        onCancel={this.handleCancel}
      />
    );
  }
}

const mapStateToProperties = state => ({
  loading: get(state, 'news.form.loading'),
  data: get(state, 'news.form.data'),
});

const mapActionsToProperties = {
  ...actions,
  push,
};

NewsCreateContainer.propTypes = {
  create: PropTypes.func,
  setLoadingForm: PropTypes.func,
  data: PropTypes.object,
  loading: PropTypes.object,
  clearForm: PropTypes.func,
  push: PropTypes.func,
};

export default connect(
  mapStateToProperties,
  mapActionsToProperties,
)(NewsCreateContainer);
