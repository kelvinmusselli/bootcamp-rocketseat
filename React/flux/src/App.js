import React from 'react';
import { Router } from 'react-router-dom';

//este provider fara com que eu libere
// o redux para todas rotas
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';

import history from './services/history';
//e dentro precisa da store
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Header />
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </Router>
    </Provider>
  );
};

export default App;
