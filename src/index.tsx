import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { store } from './data/store'
import { Provider } from 'react-redux'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
