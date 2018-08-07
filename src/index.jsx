// @ts-check

// import 'babel-polyfill'; // Use if needed.
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer, } from 'react-hot-loader';

import App from './Screens/Root';

let render;
/*
########################################
            Service Worker

Deal with service worker first.
########################################
*/
if (WEBPACK_ENV === 'production') {
  // console.log(`FRONT-END - NODE_ENV: ${process.env.NODE_ENV}`);

  const OfflinePluginRuntime = require('offline-plugin/runtime');
  OfflinePluginRuntime.install({
    onUpdateReady() {
      console.log('[SW] Updated content found.');
      OfflinePluginRuntime.applyUpdate();
    },
    onUpdating: () => {
      console.log('SW Event:', 'onUpdating');
    },
    onUpdated() {
      console.log('[SW] Updated content reloading.');
      window.location.reload();
    },
    onUpdateFailed: () => {
      console.log('SW Event:', 'onUpdateFailed');
    },
  });

  render = Component => {
    ReactDOM.render(
      <Component className='container' />,
      document.getElementById('AppContainer')
    );
  };
} else if (WEBPACK_ENV === 'development') {
  console.log(`WEBPACK_ENV: ${WEBPACK_ENV}`);
  console.log(`FRONT-END - NODE_ENV: ${process.env.NODE_ENV}`);

  render = Component => {
    ReactDOM.render(
      <AppContainer>
        <Component className='container' />
      </AppContainer>,
      document.getElementById('AppContainer')
    );
  };
} else {
  console.log(`FRONT-END - WEBPACK_ENV not seen: ${WEBPACK_ENV}`);
  console.log(`FRONT-END - NODE_ENV: ${process.env.NODE_ENV}`);
}

render(App);

if (module.hot) {
  module.hot.accept('./Screens/Root', () => {
    const NextApp = require('./Screens/Root').default;
    render(NextApp);
  });
}
