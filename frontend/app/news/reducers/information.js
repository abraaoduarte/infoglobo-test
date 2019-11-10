import { fromJS } from 'immutable';
import types from 'news/types';
import { handleActions, combineActions } from 'redux-actions';
import setValueTo from 'utils/set-value-to';

const INITIAL_STATE = fromJS({
  loading: {
    data: false,
  },
  data: {},
});

const shouldBeLoading = combineActions(
  types.SHOW,
);

const shouldStopLoading = combineActions(
  types.SHOW_SUCCESS,
  types.SHOW_FAIL,
);

const form = handleActions({
  [shouldBeLoading]: setValueTo(['loading', 'form'], true),
  [shouldStopLoading]: setValueTo(['loading', 'form'], false),
  [types.SHOW_SUCCESS]: (state, { payload }) => {
    const { result } = payload.data;
    return state.set('data', result);
  },
}, INITIAL_STATE);

export default form;
