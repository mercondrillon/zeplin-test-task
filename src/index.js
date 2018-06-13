import './index.css';
import React from 'react';
import store from './store';
import App from './components/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';

render(
  <Provider store={store}>
      <App />
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
