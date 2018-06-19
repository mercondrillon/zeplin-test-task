import './index.css';
import React from 'react';
import store from './store';
import App from './components/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter } from  'react-router-dom';

render(
  <Provider store={store}>
      <HashRouter basename='/zeplin-test-task'>
        <App />
      </HashRouter>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
