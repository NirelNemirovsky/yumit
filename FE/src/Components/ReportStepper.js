import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DistanceSlider from './DistanceSlider';
import AddCountries from './AddCountries';
import Contact from './Contact';
import DoneIcon from 'material-ui/svg-icons/action/done';
import axios from 'axios';

class ReportStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });

    if(stepIndex>=2){

        axios({
          method: 'post',
          url: 'http://172.13.2.91/',
          data: {
            countries: 'Iran, Iraq',
            distance: '100',
            phoneNumber: '+972542246624'
          }
        }).then(function(res){
          console.log(res.data);
        });
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return <DistanceSlider/>;
      case 1:
        return <AddCountries/>
      case 2:
        return <Contact/>;
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '0 16px'};

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>בחר מרחק מהחוף</StepLabel>
          </Step>
          <Step>
            <StepLabel>הכנס מדינות</StepLabel>
          </Step>
          <Step>
            <StepLabel>דרכי התקשרות</StepLabel>
          </Step>
        </Stepper>
        <div style={contentStyle}>
          {finished ? (
            <p>
              <DoneIcon style={{'color':'#2196F3'}}/>
            </p>
          ) : (
            <div>
              {this.getStepContent(stepIndex)}
              <div style={{marginTop: 12}}>
                <FlatButton
                  label="Back"
                  disabled={stepIndex === 0}
                  onClick={this.handlePrev}
                  style={{marginRight: 12}}
                />
                <RaisedButton
                  label={stepIndex === 2 ? 'Finish' : 'Next'}
                  primary={true}
                  onClick={this.handleNext}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default ReportStepper;
