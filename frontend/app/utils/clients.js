import axios from 'axios';
import { logout } from 'login/actions/auth';
import qs from 'qs';

console.log(`Using ${process.env.API} as default api client`);

export default {
  default: {
    client: axios.create({
      baseURL: process.env.API,
      responseType: 'json',
      paramsSerializer: qs.stringify,
    }),
    options: {
      returnRejectedPromiseOnError: true,
      interceptors: {
        request: [
          ({ getState }, config) => {
            const { auth } = getState().get('login').toJS();
            return {
              ...config,
              headers: {
                ...(config.headers || {}),
                Authorization: auth.token
                  ? `Bearer ${auth.token}`
                  : undefined,
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            };
          },
        ],
        response: [
          {
            success: (store, response) => response,
            error: ({ dispatch }, error) => {
              if (error.response && error.response.data.status === 401) {
                dispatch(logout());
              }

              console.error(error);
              return Promise.reject(error);
            },
          },
        ],
      },
    },
  },
};
