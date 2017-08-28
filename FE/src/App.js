import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReportStepper from './Components/ReportStepper';

const App = () => (
  <MuiThemeProvider>
    <ReportStepper />
  </MuiThemeProvider>
);

export default App;
