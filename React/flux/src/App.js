import React from 'react';
import { BrowserRouter } from 'react-router-dom';

//este provider fara com que eu libere
// o redux para todas rotas
import { Provider } from 'react-redux';

import './config/ReactotronConfig';

import GlobalStyle from './styles/global';
import Routes from './routes';
import Header from './components/Header';

//e dentro precisa da store
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes />
        <GlobalStyle />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
