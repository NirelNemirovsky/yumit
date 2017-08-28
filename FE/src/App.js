import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReportStepper from './Components/ReportStepper';
import Tabs from './Components/Tabs';

const App = () => (
  <MuiThemeProvider>
    <Tabs />
  </MuiThemeProvider>
);

export default App;
