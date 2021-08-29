import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import Routes from './Routes';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';
import './index.css';
import { StateProvider } from './store/Store';

ReactDOM.render(
  <>
    <StateProvider>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </StateProvider>
  </>,
  document.getElementById('root')
);
