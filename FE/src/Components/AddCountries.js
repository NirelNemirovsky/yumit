import React from 'react';
import TextField from 'material-ui/TextField';
import SendIcon from 'material-ui/svg-icons/content/send';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import AutoComplete from './AutoComplete';

class AddCountries extends React.Component {

  state = {
  };

  render() {

    return (
      <div style={{'text-align':'center'}}>
        <AutoComplete/>
        <FloatingActionButton>
          <SendIcon/>
        </FloatingActionButton>
      </div>
    );
  }
}

export default AddCountries;
