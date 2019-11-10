import { fromJS } from 'immutable';
import types from 'news/types';
import { handleActions, combineActions } from 'redux-actions';
import setValueTo from 'utils/set-value-to';
import setActionPayloadTo from 'utils/set-action-payload-to';

const INITIAL_STATE = fromJS({
  loading: {
    news: false,
    form: false,
  },
  data: {},
});

const shouldBeLoading = combineActions(
  types.CREATE,
  types.UPDATE,
  types.SHOW,
);

const shouldStopLoading = combineActions(
  types.CREATE_SUCCESS,
  types.CREATE_FAIL,
  types.UPDATE_SUCCESS,
  types.UPDATE_FAIL,
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
  [types.CREATE_SUCCESS]: () => INITIAL_STATE,
  [types.UPDATE_SUCCESS]: () => INITIAL_STATE,
  [types.CLEAR_FORM]: () => INITIAL_STATE,
  [types.SET_LOADING_FORM]: setActionPayloadTo(['loading', 'form']),
}, INITIAL_STATE);

export default form;
