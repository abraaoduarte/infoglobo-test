import types from 'news/types';
import response from 'utils/response';


export const list = () => dispatch => dispatch({
  type: types.LIST,
  payload: {
    request: {
      url: '/api/news',
    },
  },
});

export const remove = id => dispatch => dispatch({
  type: types.REMOVE,
  payload: {
    request: {
      method: 'DELETE',
      url: `/api/news/${id}`,
    },
  },
}).then(response.success)
  .then(() => dispatch(list()))
  .catch(response.error);
