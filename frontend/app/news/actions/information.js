import response from 'utils/response';
import types from 'news/types';
import { push } from 'connected-react-router';
import { message } from 'antd';

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
