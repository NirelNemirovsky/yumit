import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Tabs from './Components/Tabs';

const App = () => (
  <MuiThemeProvider>
    <Tabs />
  </MuiThemeProvider>
);

export default App;
