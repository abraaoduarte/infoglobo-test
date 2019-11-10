import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import get from 'utils/get';
import * as actions from 'news/actions/information';
import { push } from 'connected-react-router';
import { NewsInformation } from 'news/components';

class NewsInformationContainer extends Component {
  handleCancel = () => this.props.push('/news');

  componentDidMount() {
    this.props.show(this.props.match.params.id);
  }

  render() {
    const {
      loading,
      data,
    } = this.props;

    return (
      <NewsInformation
        loading={loading}
        data={data}
        onCancel={this.handleCancel}
      />
    );
  }
}

const mapStateToProperties = state => ({
  loading: get(state, 'news.information.loading'),
  data: get(state, 'news.information.data'),
});

const mapActionsToProperties = {
  ...actions,
  push,
};

NewsInformationContainer.propTypes = {
  data: PropTypes.object,
  loading: PropTypes.object,
  match: PropTypes.object,
  show: PropTypes.func,
  push: PropTypes.func,
};

export default connect(
  mapStateToProperties,
  mapActionsToProperties,
)(NewsInformationContainer);
