import React from 'react';
import ReactDOM from 'react-dom';
import {MessageProvider} from './context/messageContext'
import App from './App';

ReactDOM.render(
  <MessageProvider>
    <App />
  </MessageProvider>,
  document.getElementById('root')
);

