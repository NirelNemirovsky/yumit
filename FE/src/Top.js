import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ReportStepper from './Components/ReportStepper';
import Tabs from './Components/Tabs';
import Sea from './Sea.png';
import Ship from './Ship.png';
import './Top.css';

const Top = () => (
  <MuiThemeProvider>
    <div className="Inner-top">
      <img src={Ship} className="Center-Ship Top-Ship"/>
      <img src={Sea} className="Center-Ship Sea-bottom"/>
    </div>
  </MuiThemeProvider>
);

export default Top;
