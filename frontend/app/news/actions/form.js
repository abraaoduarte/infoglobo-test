import response from 'utils/response';
import { createAction } from 'redux-actions';
import types from 'news/types';
import { push } from 'connected-react-router';
import { message } from 'antd';

export const clearForm = createAction(types.CLEAR_FORM);
export const setLoadingForm = createAction(types.SET_LOADING_FORM);


export const create = form => (dispatch) => {
  const creating = dispatch({
    type: types.CREATE,
    payload: {
      request: {
        method: 'post',
        url: '/api/news',
        data: form,
      },
    },
  });

  return creating
    .then(response.success)
    .then(() => dispatch(push('/news')))
    .catch(response.error);
};

export const show = id => (dispatch) => {
  const showing = dispatch({
    type: types.SHOW,
    payload: {
      request: {
        method: 'get',
        url: `/api/news/${id}`,
      },
    },
  });

  return showing.catch((error) => {
    if (error.response && error.response.status) {
      message.warning(response.edit(error.response.status));
    }

    dispatch(push('/news'));
  });
};

export const update = ({ id, ...values }) => (dispatch) => {
  const updating = dispatch({
    type: types.UPDATE,
    payload: {
      request: {
        method: 'patch',
        url: `/api/news/${id}`,
        data: values,
      },
    },
  });

  return updating
    .then(response.success)
    .then(() => dispatch(push('/news')))
    .catch(response.error);
};
