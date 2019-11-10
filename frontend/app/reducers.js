import { combineReducers } from 'redux-immutable';
import { connectRouter } from 'connected-react-router/immutable';
import loginReducer from 'login/reducers';

import history from 'utils/history';

export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    router: connectRouter(history),
    login: loginReducer,
    ...injectedReducers,
  });

  return rootReducer;
}
