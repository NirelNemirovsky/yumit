import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import ReportStepper from './ReportStepper';
import Charts from './Charts';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export default class TabsExampleControlled extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 'a',
    };
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}>
        <Tab label="פרטי התראה" value="a">
          <div>
            <h2 style={styles.headline}></h2>
            <ReportStepper />
          </div>
        </Tab>
        <Tab label="סטטיסטיקות למחקר" value="b">
          <div>
            <h2 style={styles.headline}>Coming soon :)</h2>
            <Charts />
          </div>
        </Tab>
      </Tabs>
    );
  }
}
