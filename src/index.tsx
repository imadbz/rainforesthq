import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/Home';
import { store } from './data/store'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>
);
