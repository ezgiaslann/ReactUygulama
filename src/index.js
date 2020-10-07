import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {UserProvider} from './context';
ReactDOM.render(
  <React.StrictMode>
  <UserProvider>
   <App />
  </UserProvider>
   
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();