import { fromJS } from 'immutable';

const setActionResultTo = to => (state, { payload }) => (Array.isArray(to)
  ? state.setIn(to, fromJS(payload.data.result))
  : state.set(to, fromJS(payload.data.result)));

export default setActionResultTo;
