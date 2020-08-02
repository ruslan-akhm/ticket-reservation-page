import React from 'react';
import ReactDOM from 'react-dom';
import {MessageProvider} from './context/messageContext'
//import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <MessageProvider>
    <App />
  </MessageProvider>,
  document.getElementById('root')
);

