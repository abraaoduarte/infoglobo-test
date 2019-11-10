import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import get from 'utils/get';
import * as actions from 'news/actions/list';
import { NewsList } from 'news/components';

class NewsListContainer extends Component {
  componentDidMount() {
    this.props.list();
  }

  handleDeletion = id => this.props.remove(id);

  handleEdition = id => this.props.push({
    pathname: `/news/${id}/update`,
    state: { id },
  });

  handleInformation = id => this.props.push({
    pathname: `/news/${id}/details`,
    state: { id },
  });

  render() {
    const {
      isLoading,
      news,
    } = this.props;

    return (
      <NewsList
        isLoading={isLoading}
        news={news}
        onEdit={this.handleEdition}
        onDelete={this.handleDeletion}
        onInformation={this.handleInformation}
      />
    );
  }
}

const mapStateToProperties = state => ({
  user: get(state, 'login.auth.user'),
  isLoading: get(state, 'news.list.isLoading'),
  news: get(state, 'news.list.news'),
});

const mapActionsToProperties = {
  ...actions,
  push,
};

NewsListContainer.propTypes = {
  remove: PropTypes.func,
  isLoading: PropTypes.bool,
  news: PropTypes.array,
  push: PropTypes.func,
  list: PropTypes.func,
};

export default connect(
  mapStateToProperties,
  mapActionsToProperties,
)(NewsListContainer);
