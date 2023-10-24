import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from './store/redux/store.js';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </React.StrictMode>
);
