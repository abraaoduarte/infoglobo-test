import { message } from 'antd';
import moment from 'moment';
import types from 'login/types';
import base64 from 'base-64';
import { createAction } from 'redux-actions';
import { push } from 'connected-react-router';

export const setToken = createAction(types.SET_TOKEN);
export const setLoading = createAction(types.SET_LOADING);
export const setUser = createAction(types.SET_USER);

const handleAuthResponse = ({ payload }) => {
  localStorage.setItem('@infoglobo/token', base64.encode(payload.data.result.token));
  localStorage.setItem('@infoglobo/last-login', moment().format());
  localStorage.setItem('@infoglobo/user', JSON.stringify(payload.data.result.user));
  return payload;
};

export const auth = data => (dispatch, getState) => dispatch({
  type: types.AUTH,
  payload: {
    request: {
      url: 'auth/login',
      method: 'POST',
      data,
    },
  },
})
  .then(handleAuthResponse)
  .then(() => {
    const { location } = getState()
      .get('router')
      .toJS();
    if (location.state && location.state.from) {
      return dispatch(push(location.state.from.pathname));
    }

    return dispatch(push('/'));
  })
  .catch((error) => {
    const axiosError = error.error;

    if (axiosError && axiosError.response) {
      switch (axiosError.response.status) {
        case 401:
          return message.error('E-mail ou senha não é válida. Por favor, corrija suas credenciais.');
        default:
          return message.error(
            'Houve um problema com a solicitação de autenticação. Tente mais tarde.',
          );
      }
    }

    return message.error(
      'Houve um problema com a solicitação de autenticação. Tente mais tarde.',
    );
  });

export const renew = () => dispatch => dispatch({
  type: types.RENEW,
  payload: {
    request: {
      url: 'auth/renew',
      method: 'POST',
    },
  },
})
  .then(handleAuthResponse)
  .then(({ data }) => dispatch(setUser(data.result.user)))
  .catch(() => {
    localStorage.removeItem('@infoglobo/token');
    localStorage.removeItem('@infoglobo/user');
    dispatch(push('/'));
  });

export const verifyLogin = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { auth } = getState()
    .get('login')
    .toJS();

  const token = localStorage.getItem('@infoglobo/token');
  const user = localStorage.getItem('@infoglobo/user');

  if (token && user) {
    if (!auth.token) {
      dispatch(setToken(base64.decode(token)));
    }

    if (!auth.user) {
      dispatch(setUser(JSON.parse(user)));
    }

    await dispatch(renew());
    dispatch(setLoading(false));

    return true;
  }

  localStorage.removeItem('@infoglobo/token');
  localStorage.removeItem('@infoglobo/user');

  dispatch(setLoading(false));
  return false;
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('@infoglobo/token');
  localStorage.removeItem('@infoglobo/user');
  dispatch(setToken(null));
  dispatch(setUser(null));
  dispatch(push('/login'));
};
