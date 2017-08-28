import React, {Component} from 'react';
import Slider from 'material-ui/Slider';

const min = 20;
const max = 500;
const power = 5;

function transform(value) {
  return Math.round((Math.exp(power * value / max) - 1) / (Math.exp(power) - 1) * max);
}

function reverse(value) {
  return (1 / power) * Math.log(((Math.exp(power) - 1) * value / max) + 1) * max;
}

export default class DistanceSlider extends Component {
  state = {
    slider: 100,
  };

  handleSlider = (event, value) => {
    this.setState({slider: transform(value)});
  };

  render() {
    return (
      <div>
        <Slider
          min={min}
          max={max}
          step={max / 100}
          value={reverse(this.state.slider)}
          onChange={this.handleSlider}
        />
        <p>
          <span>{'מרחק התרעה: '}</span>
          <span>{this.state.slider}</span>
          <span>{' מייל'}</span>
        </p>
      </div>
    );
  }
}
