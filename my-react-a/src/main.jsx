// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import store from './redux/store';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <ThemeProvider> {/* Оборачиваем всё приложение */}
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </Provider>
);