import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Top from './Top';
import './index.css';

ReactDOM.render(
  <Top />,
  document.getElementById('top')
);

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
