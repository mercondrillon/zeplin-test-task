import './index.css';
import React from 'react';
import store from './store';
import App from './components/App';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import { HashRouter as Router } from  'react-router-dom';

render(
  <Provider store={store}>
      <Router>
        <div>
          <App />
        </div>
      </Router>
  </Provider>, 
  document.getElementById('root')
);
registerServiceWorker();
