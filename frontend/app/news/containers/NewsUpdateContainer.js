import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'utils/get';
import * as actions from 'news/actions/form';
import { push } from 'connected-react-router';
import { Form } from 'news/components';

class NewsUpdateContainer extends Component {
  handleSubmit = (event, form) => {
    form.validateFields((error, values) => {
      if (!error) {
        this.props.update({
          id: this.props.match.params.id,
          ...values,
        });
      }
    });
  };

  handleCancel = () => this.props.push('/news');

  async componentDidMount() {
    this.props.clearForm();
    try {
      this.props.setLoadingForm(false);
      this.props.show(this.props.match.params.id);
    } catch (error) {
      console.error(error);
    } finally {
      this.props.setLoadingForm(false);
    }
  }

  render() {
    const {
      loading,
      data,
    } = this.props;

    return (
      <Form
        loading={loading}
        data={data}
        onCancel={this.handleCancel}
        onSubmit={this.handleSubmit}
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

NewsUpdateContainer.propTypes = {
  update: PropTypes.func,
  setLoadingForm: PropTypes.func,
  data: PropTypes.object,
  loading: PropTypes.object,
  match: PropTypes.object,
  clearForm: PropTypes.func,
  show: PropTypes.func,
  push: PropTypes.func,
};

export default connect(
  mapStateToProperties,
  mapActionsToProperties,
)(NewsUpdateContainer);
