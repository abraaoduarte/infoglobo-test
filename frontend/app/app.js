import '@babel/polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { Map } from 'immutable';
import FontFaceObserver from 'fontfaceobserver';
import history from 'utils/history';
import { ConfigProvider } from 'antd';
import moment from 'moment';
import ptBR from 'antd/es/locale/pt_BR';
import 'sanitize.css/sanitize.css';
import 'moment/locale/pt-br';
import Router from './router';
import 'antd/dist/antd.less';

import '!file-loader?name=[name].[ext]!./images/favicon.ico';
import 'file-loader?name=.htaccess!./.htaccess'; // eslint-disable-line import/extensions

import configureStore from './configureStore';


moment.locale('pt-br');
const openSansObserver = new FontFaceObserver('Open Sans', {});

openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const initialState = Map({});
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = () => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ConfigProvider locale={ptBR}>
          <Router />
        </ConfigProvider>
      </ConnectedRouter>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  module.hot.accept(() => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install(); // eslint-disable-line global-require
}
