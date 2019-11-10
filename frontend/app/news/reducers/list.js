import { fromJS } from 'immutable';
import types from 'news/types';
import { handleActions, combineActions } from 'redux-actions';
import setActionResultTo from 'utils/set-action-result-to';

const INITIAL_STATE = fromJS({
  news: [],
  isLoading: true,
});

const shouldStartLoading = combineActions(
  types.LIST,
  types.REMOVE,
);

const shouldStopLoading = combineActions(
  types.LIST_SUCCESS,
  types.LIST_FAIL,
  types.REMOVE_SUCCESS,
  types.REMOVE_FAIL,
);

const list = handleActions({
  [shouldStartLoading]: state => state.set('isLoading', true),
  [shouldStopLoading]: state => state.set('isLoading', false),
  [types.LIST_SUCCESS]: setActionResultTo('news'),
}, INITIAL_STATE);

export default list;
