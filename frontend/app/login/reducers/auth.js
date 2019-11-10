import { handleActions } from 'redux-actions';
import { fromJS } from 'immutable';
import types from 'login/types';

const INITIAL_STATE = fromJS({
  isLoading: true,
  token: null,
  user: null,
});

const reducer = handleActions(
  {
    [types.SET_LOADING]: (state, { payload }) => state.set('isLoading', payload),
    [types.SET_USER]: (state, { payload }) => state.set('user', payload),
    [types.SET_TOKEN]: (state, { payload }) => state.set('token', payload),
    [types.AUTH]: state => state.set('isLoading', true),
    [types.AUTH_FAIL]: state => state.set('isLoading', false),
    [types.AUTH_SUCCESS]: (state, { payload: response }) => state
      .set('isLoading', false)
      .set('token', response.data.result.token)
      .set('user', response.data.result.user),
    [types.RENEW_FAIL]: state => state
      .set('isLoading', false)
      .set('token', null)
      .set('user', null),
  },
  INITIAL_STATE,
);

export default reducer;
